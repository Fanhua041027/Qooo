import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { CreateFarmDto, UpdateFarmDto } from './dto/farm.dto';
import { CreatePlotDto, UpdatePlotDto } from './dto/plot.dto';
import { FarmService } from './farm.service';

@ApiTags('农场与地块')
@ApiBearerAuth()
@Controller('v1')
export class FarmController {
  constructor(private readonly farms: FarmService) {}

  @Get('farms')
  @ApiOperation({ summary: '农场列表' })
  list(@CurrentUser() user: AuthUser) {
    return this.farms.listFarms(user.id);
  }

  @Post('farms')
  @ApiOperation({ summary: '创建农场' })
  create(@CurrentUser() user: AuthUser, @Body() input: CreateFarmDto) {
    return this.farms.createFarm(user.id, input);
  }

  @Patch('farms/:farmId')
  @ApiOperation({ summary: '更新农场' })
  update(@CurrentUser() user: AuthUser, @Param('farmId') farmId: string, @Body() input: UpdateFarmDto) {
    return this.farms.updateFarm(user.id, farmId, input);
  }

  @Get('farms/:farmId/plots')
  @ApiOperation({ summary: '地块列表' })
  plots(@CurrentUser() user: AuthUser, @Param('farmId') farmId: string) {
    return this.farms.listPlots(user.id, farmId);
  }

  @Post('farms/:farmId/plots')
  @ApiOperation({ summary: '创建地块' })
  createPlot(@CurrentUser() user: AuthUser, @Param('farmId') farmId: string, @Body() input: CreatePlotDto) {
    return this.farms.createPlot(user.id, farmId, input);
  }

  @Patch('plots/:plotId')
  @ApiOperation({ summary: '更新地块' })
  updatePlot(@CurrentUser() user: AuthUser, @Param('plotId') plotId: string, @Body() input: UpdatePlotDto) {
    return this.farms.updatePlot(user.id, plotId, input);
  }

  @Delete('plots/:plotId')
  @ApiOperation({ summary: '软删除地块，保留已有诊断' })
  deletePlot(@CurrentUser() user: AuthUser, @Param('plotId') plotId: string) {
    return this.farms.deletePlot(user.id, plotId);
  }
}
