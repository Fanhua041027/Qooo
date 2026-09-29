import { HttpStatus } from '@nestjs/common';
import { FieldServicesService } from './field-services.service';

function createPrismaMock() {
  return {
    shopOrder: { create: jest.fn() },
    communityPost: { findMany: jest.fn(), create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
    communityPostLike: { findUnique: jest.fn(), create: jest.fn(), delete: jest.fn() },
    expertChatSession: { upsert: jest.fn() },
    expertChatMessage: { create: jest.fn() },
    $transaction: jest.fn(async (operations: Promise<unknown>[]) => Promise.all(operations)),
  } as any;
}

function createWeatherMock() {
  return {
    getForecast: jest.fn().mockResolvedValue({ location: '临安', updatedAt: new Date().toISOString(), source: 'MOCK', current: { temperature: 27, feelsLike: 28, condition: '多云', humidity: 70, wind: '东风 2 级', uvIndex: 4 }, daily: [{ date: '2026-09-29', weekday: '周二', condition: '多云', icon: 'cloudy', high: 30, low: 22, precipitation: 20, wind: '东风 2 级' }] }),
    getHistory: jest.fn(),
  } as any;
}

describe('FieldServicesService', () => {
  it('天气始终返回可用的字段和更新时间', async () => {
    const result = await new FieldServicesService(createPrismaMock(), createWeatherMock()).getWeather({ location: '临安' });
    expect(result).toMatchObject({ location: '临安', current: { temperature: expect.any(Number) }, forecast: expect.any(Array), alerts: expect.any(Array) });
    expect(Number.isNaN(Date.parse(result.updatedAt))).toBe(false);
  });

  it('商品分类只返回匹配目录', () => {
    const result = new FieldServicesService(createPrismaMock(), createWeatherMock()).listProducts('TOOLS');
    expect(result.total).toBeGreaterThan(0);
    expect(result.items.every((item) => item.category === 'TOOLS')).toBe(true);
  });

  it('拒绝空地址、空购物车和超库存订单', async () => {
    const service = new FieldServicesService(createPrismaMock(), createWeatherMock());
    await expect(service.createOrder('user-1', { address: '', items: [] })).rejects.toMatchObject({ code: 'SHOP_ORDER_INVALID', status: HttpStatus.BAD_REQUEST });
    await expect(service.createOrder('user-1', { address: '农场', items: [{ productId: 'missing', quantity: 1 }] })).rejects.toMatchObject({ code: 'SHOP_PRODUCT_UNAVAILABLE', status: HttpStatus.CONFLICT });
  });

  it('创建订单时保留待支付状态并写入商品快照', async () => {
    const prisma = createPrismaMock();
    prisma.shopOrder.create.mockResolvedValue({ id: 'order-1', total: 12, address: '农场', status: 'PENDING_PAYMENT', createdAt: new Date('2026-01-01'), items: [{ productId: 'product-tool-001', productName: '叶片病斑取样袋', unit: '包', price: 12, quantity: 1 }] });
    const result = await new FieldServicesService(prisma, createWeatherMock()).createOrder('user-1', { address: '农场', items: [{ productId: 'product-tool-001', quantity: 1 }] });
    expect(result).toMatchObject({ id: 'order-1', status: 'PENDING_PAYMENT', total: 12, items: [{ quantity: 1 }] });
    expect(prisma.shopOrder.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ userId: 'user-1', status: 'PENDING_PAYMENT' }) }));
  });

  it('拒绝不存在的专家和空消息', async () => {
    const service = new FieldServicesService(createPrismaMock(), createWeatherMock());
    await expect(service.getChat('user-1', 'missing')).rejects.toMatchObject({ code: 'EXPERT_NOT_FOUND', status: HttpStatus.NOT_FOUND });
    await expect(service.sendMessage('user-1', 'expert-001', { text: '   ' })).rejects.toMatchObject({ code: 'CHAT_MESSAGE_INVALID', status: HttpStatus.BAD_REQUEST });
  });
});
