import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { currentContext } from '../../common/request-context';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateFarmDto, UpdateFarmDto } from './dto/farm.dto';
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';

@Injectable()
export class FarmService {
  constructor(private readonly prisma: PrismaService) {}

  async listFarms(userId: string) {
    const items = await this.prisma.farm.findMany({
      where: { ownerId: userId, deletedAt: null },
      include: { plots: { where: { deletedAt: null }, orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    });
    return { items: items.map((farm) => this.presentFarm(farm)), total: items.length };
  }

  async createFarm(userId: string, input: CreateFarmDto) {
    const farm = await this.prisma.farm.create({ data: { ownerId: userId, ...input } });
    await this.audit(userId, 'farm.created', 'farm', farm.id);
    return this.presentFarm(farm);
  }

  async updateFarm(userId: string, farmId: string, input: UpdateFarmDto) {
    await this.requireFarm(userId, farmId);
    const farm = await this.prisma.farm.update({ where: { id: farmId }, data: input });
    await this.audit(userId, 'farm.updated', 'farm', farm.id);
    return this.presentFarm(farm);
  }

  async listPlots(userId: string, farmId: string) {
    await this.requireFarm(userId, farmId);
    const items = await this.prisma.plot.findMany({
      where: { farmId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return { items: items.map((plot) => this.presentPlot(plot)), total: items.length };
  }

  async createPlot(userId: string, farmId: string, input: CreatePlotDto) {
    await this.requireFarm(userId, farmId);
    const plot = await this.prisma.plot.create({
      data: { ...input, plantedAt: new Date(input.plantedAt), farmId },
    });
    await this.audit(userId, 'plot.created', 'plot', plot.id);
    return this.presentPlot(plot);
  }

  async updatePlot(userId: string, plotId: string, input: UpdatePlotDto) {
    await this.requirePlot(userId, plotId);
    const plot = await this.prisma.plot.update({
      where: { id: plotId },
      data: { ...input, plantedAt: input.plantedAt ? new Date(input.plantedAt) : undefined },
    });
    await this.audit(userId, 'plot.updated', 'plot', plot.id);
    return this.presentPlot(plot);
  }

  async deletePlot(userId: string, plotId: string) {
    await this.requirePlot(userId, plotId);
    await this.prisma.plot.update({ where: { id: plotId }, data: { deletedAt: new Date() } });
    await this.audit(userId, 'plot.deleted', 'plot', plotId);
    return { id: plotId, deleted: true };
  }

  async requireFarm(userId: string, farmId: string) {
    const farm = await this.prisma.farm.findFirst({ where: { id: farmId, ownerId: userId, deletedAt: null } });
    if (!farm) throw new ApiError(ErrorCode.FARM_NOT_FOUND, '农场不存在', HttpStatus.NOT_FOUND);
    return farm;
  }

  async requirePlot(userId: string, plotId: string) {
    const plot = await this.prisma.plot.findFirst({
      where: { id: plotId, deletedAt: null, farm: { ownerId: userId, deletedAt: null } },
    });
    if (!plot) throw new ApiError(ErrorCode.PLOT_NOT_FOUND, '地块不存在', HttpStatus.NOT_FOUND);
    return plot;
  }

  private presentFarm(farm: Record<string, unknown> & { areaMu?: { toNumber(): number } | null; plots?: unknown[] }) {
    return { ...farm, areaMu: farm.areaMu?.toNumber() ?? null, plots: farm.plots?.map((plot) => this.presentPlot(plot as never)) };
  }

  private presentPlot(plot: Record<string, unknown> & { areaMu?: { toNumber(): number } | null }) {
    return { ...plot, areaMu: plot.areaMu?.toNumber() ?? null };
  }

  private async audit(userId: string, action: string, resource: string, resourceId: string) {
    const { requestId, traceId } = currentContext();
    await this.prisma.auditLog.create({ data: { userId, action, resource, resourceId, requestId, traceId } });
  }
}
