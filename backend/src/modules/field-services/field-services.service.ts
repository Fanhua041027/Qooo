import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateCommunityPostDto, CreateShopOrderDto, SendExpertMessageDto } from './dto/field-services.dto';
import { EXPERTS, ExpertProfile, SHOP_PRODUCTS, ShopProduct, WEATHER_OVERVIEW } from './field-services.catalog';
import { WeatherForecastInput, WeatherInputError, WeatherProvider } from './weather.provider';

@Injectable()
export class FieldServicesService {
  constructor(private readonly prisma: PrismaService, private readonly weather: WeatherProvider) {}

  async getWeather(input: WeatherForecastInput = {}) {
    let forecast;
    try {
      forecast = await this.weather.getForecast({ ...input, days: input.days || 5, granularity: 'daily' });
    } catch {
      throw new ApiError(ErrorCode.WEATHER_UPSTREAM_ERROR, '实时天气服务暂时不可用，请稍后重试', HttpStatus.BAD_GATEWAY);
    }
    const current = forecast.current || WEATHER_OVERVIEW.current;
    const firstDay = forecast.daily[0];
    return {
      location: forecast.location,
      updatedAt: forecast.updatedAt,
      source: forecast.source,
      current: { ...current, icon: firstDay?.icon || 'cloudy' },
      forecast: forecast.daily.slice(0, 5),
      alerts: this.weatherAlerts(forecast),
    };
  }

  async getWeatherForecast(input: WeatherForecastInput = {}) {
    try {
      return await this.weather.getForecast(input);
    } catch {
      throw new ApiError(ErrorCode.WEATHER_UPSTREAM_ERROR, '实时天气服务暂时不可用，请稍后重试', HttpStatus.BAD_GATEWAY);
    }
  }

  async getWeatherHistory(input: WeatherForecastInput & { startDate?: string; endDate?: string } = {}) {
    try {
      return await this.weather.getHistory(input);
    } catch (error) {
      if (error instanceof WeatherInputError) throw new ApiError(ErrorCode.WEATHER_HISTORY_INVALID, error.message, HttpStatus.BAD_REQUEST);
      throw new ApiError(ErrorCode.WEATHER_UPSTREAM_ERROR, '历史天气服务暂时不可用，请稍后重试', HttpStatus.BAD_GATEWAY);
    }
  }

  listProducts(category?: string) {
    const normalized = category?.trim().toUpperCase();
    const items = normalized ? SHOP_PRODUCTS.filter((product) => product.category === normalized) : SHOP_PRODUCTS;
    return { items, total: items.length };
  }

  async createOrder(userId: string, input: CreateShopOrderDto) {
    const address = input.address.trim();
    if (!address || !input.items?.length) throw new ApiError(ErrorCode.SHOP_ORDER_INVALID, '请填写收货信息并至少选择一件商品', HttpStatus.BAD_REQUEST);
    const quantities = new Map<string, number>();
    for (const item of input.items) quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity);
    const resolved = [...quantities.entries()].map(([productId, quantity]) => {
      const product = SHOP_PRODUCTS.find((candidate) => candidate.id === productId);
      if (!product || quantity < 1 || quantity > product.stock) throw new ApiError(ErrorCode.SHOP_PRODUCT_UNAVAILABLE, '商品库存或数量不可用，请刷新后重试', HttpStatus.CONFLICT);
      return { product, quantity };
    });
    const total = resolved.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = await this.prisma.shopOrder.create({
      data: {
        userId,
        address,
        note: input.note?.trim() || undefined,
        total,
        status: 'PENDING_PAYMENT',
        items: { create: resolved.map(({ product, quantity }) => ({ productId: product.id, productName: product.name, unit: product.unit, price: product.price, quantity })) },
      },
      include: { items: true },
    });
    return this.presentOrder(order);
  }

  async listPosts(userId: string, topic?: string) {
    const crop = topic?.trim();
    const posts = await this.prisma.communityPost.findMany({
      where: crop && crop !== '全部' ? { crop } : undefined,
      include: { author: true, reactions: { where: { userId }, select: { id: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return { items: posts.map((post) => this.presentPost(post)), total: posts.length };
  }

  async createPost(userId: string, input: CreateCommunityPostDto) {
    const title = input.title.trim();
    const content = input.content.trim();
    if (!title || !content) throw new ApiError(ErrorCode.COMMUNITY_POST_INVALID, '标题和内容不能为空', HttpStatus.BAD_REQUEST);
    const post = await this.prisma.communityPost.create({
      data: { authorId: userId, title, content, crop: input.crop?.trim() || undefined, tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean).slice(0, 5) },
      include: { author: true, reactions: { where: { userId }, select: { id: true } } },
    });
    return this.presentPost(post);
  }

  async likePost(userId: string, postId: string) {
    const post = await this.prisma.communityPost.findUnique({ where: { id: postId }, include: { author: true } });
    if (!post) throw new ApiError(ErrorCode.COMMUNITY_POST_NOT_FOUND, '帖子不存在', HttpStatus.NOT_FOUND);
    const existing = await this.prisma.communityPostLike.findUnique({ where: { postId_userId: { postId, userId } } });
    if (existing) {
      await this.prisma.$transaction([
        this.prisma.communityPostLike.delete({ where: { id: existing.id } }),
        this.prisma.communityPost.update({ where: { id: postId }, data: { likes: { decrement: 1 } } }),
      ]);
    } else {
      await this.prisma.$transaction([
        this.prisma.communityPostLike.create({ data: { postId, userId } }),
        this.prisma.communityPost.update({ where: { id: postId }, data: { likes: { increment: 1 } } }),
      ]);
    }
    const updated = await this.prisma.communityPost.findUnique({ where: { id: postId }, include: { author: true, reactions: { where: { userId }, select: { id: true } } } });
    return this.presentPost(updated!);
  }

  listExperts() {
    return { items: EXPERTS, total: EXPERTS.length };
  }

  async getChat(userId: string, expertId: string) {
    const expert = this.requireExpert(expertId);
    const session = await this.prisma.expertChatSession.upsert({
      where: { userId_expertId: { userId, expertId } },
      create: { userId, expertId, status: 'WAITING', messages: { create: [{ sender: 'SYSTEM', text: '这是辅助复核通道。请补充作物、地块和异常部位照片，聊天建议不能替代现场用药指导。' }] } },
      update: {},
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    return this.presentChat(session, expert);
  }

  async sendMessage(userId: string, expertId: string, input: SendExpertMessageDto) {
    const expert = this.requireExpert(expertId);
    const text = input.text.trim();
    if (!text) throw new ApiError(ErrorCode.CHAT_MESSAGE_INVALID, '消息不能为空', HttpStatus.BAD_REQUEST);
    const session = await this.prisma.expertChatSession.upsert({ where: { userId_expertId: { userId, expertId } }, create: { userId, expertId, status: 'ACTIVE' }, update: { status: 'ACTIVE' } });
    const [message] = await this.prisma.$transaction([
      this.prisma.expertChatMessage.create({ data: { sessionId: session.id, sender: 'USER', text } }),
      this.prisma.expertChatMessage.create({ data: { sessionId: session.id, sender: 'EXPERT', text: '收到。请补充一张异常部位近照和一张整株分布照，我会结合生长阶段继续判断。' } }),
    ]);
    return { id: message.id, sender: message.sender, text: message.text, createdAt: message.createdAt.toISOString() };
  }

  private requireExpert(expertId: string) {
    const expert = EXPERTS.find((candidate) => candidate.id === expertId);
    if (!expert) throw new ApiError(ErrorCode.EXPERT_NOT_FOUND, '专家不存在', HttpStatus.NOT_FOUND);
    return expert;
  }

  private weatherAlerts(forecast: { daily: Array<{ precipitation: number; condition: string }>; current?: { humidity: number } }) {
    const alerts = [] as Array<{ id: string; level: 'INFO' | 'WARNING' | 'DANGER'; title: string; content: string; action: string }>;
    const maxRain = Math.max(...forecast.daily.map((day) => day.precipitation), 0);
    if (maxRain >= 60) alerts.push({ id: 'rain-forecast', level: 'WARNING', title: '降雨概率较高', content: `未来预报最高降雨概率约 ${maxRain}%，叶面潮湿时段注意通风。`, action: '调整农事任务' });
    if ((forecast.current?.humidity || 0) >= 80 || forecast.daily.some((day) => /雨/.test(day.condition))) alerts.push({ id: 'humidity-forecast', level: 'WARNING', title: '叶面湿度风险', content: '湿度或降雨偏高，病害观察应优先记录叶片正反面。', action: '拍照记录异常' });
    return alerts.length ? alerts : WEATHER_OVERVIEW.alerts;
  }

  private presentOrder(order: { id: string; total: number; address: string; status: string; createdAt: Date; items: Array<{ productId: string; productName: string; unit: string; price: number; quantity: number }> }) {
    return { id: order.id, items: order.items.map((item) => ({ product: SHOP_PRODUCTS.find((product) => product.id === item.productId) || this.productFromItem(item), quantity: item.quantity })), total: order.total, address: order.address, status: order.status, createdAt: order.createdAt.toISOString() };
  }

  private productFromItem(item: { productId: string; productName: string; unit: string; price: number }): ShopProduct {
    return { id: item.productId, name: item.productName, subtitle: '已下单商品', category: 'TOOLS', categoryLabel: '农资', price: item.price, unit: item.unit, stock: 0, safetyNote: '请按商品标签和当地规范使用。', suitableCrops: ['通用'] };
  }

  private presentPost(post: any) {
    const role = post.author.role === UserRole.EXPERT ? 'EXPERT' : post.author.role === UserRole.OPERATOR || post.author.role === UserRole.ADMIN ? 'OFFICIAL' : 'FARMER';
    return { id: post.id, author: post.author.nickname, role, crop: post.crop || undefined, title: post.title, content: post.content, tags: post.tags, likes: post.likes, comments: post.comments, liked: Boolean(post.reactions?.length), createdAt: post.createdAt.toISOString() };
  }

  private presentChat(session: any, expert: ExpertProfile) {
    return { id: session.id, expert, status: session.status, messages: session.messages.map((message: any) => ({ id: message.id, sender: message.sender, text: message.text, createdAt: message.createdAt.toISOString() })) };
  }
}
