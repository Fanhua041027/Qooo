import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { OpsConfigService } from './ops-config.service';
import { CreateOpsConfigDto, PreviewOpsConfigDto, RollbackOpsConfigDto, UpdateOpsConfigDto } from './dto/ops-config.dto';

@ApiTags('运营配置')
@ApiBearerAuth()
@Controller('v1/ops/configs')
export class OpsConfigController {
  constructor(private readonly configs: OpsConfigService) {}

  @Get()
  @ApiOperation({ summary: '运营配置列表；运营、农艺专家和管理员可访问' })
  list(@CurrentUser() user: AuthUser) { return this.configs.list(user); }

  @Get(':key')
  @ApiOperation({ summary: '读取运营配置' })
  get(@CurrentUser() user: AuthUser, @Param('key') key: string) { return this.configs.get(user, key); }

  @Post()
  @ApiOperation({ summary: '新增并发布运营配置' })
  create(@CurrentUser() user: AuthUser, @Body() input: CreateOpsConfigDto) { return this.configs.create(user, input); }

  @Post('preview')
  @ApiOperation({ summary: '校验并预览配置，不写入数据库' })
  preview(@CurrentUser() user: AuthUser, @Body() input: PreviewOpsConfigDto) { return this.configs.preview(user, input); }

  @Patch(':key')
  @Put(':key')
  @ApiOperation({ summary: '保存新配置版本' })
  update(@CurrentUser() user: AuthUser, @Param('key') key: string, @Body() input: UpdateOpsConfigDto) { return this.configs.update(user, key, input); }

  @Post(':key/rollback')
  @ApiOperation({ summary: '回滚到历史版本并生成新版本' })
  rollback(@CurrentUser() user: AuthUser, @Param('key') key: string, @Body() input: RollbackOpsConfigDto) { return this.configs.rollback(user, key, input.version); }

  @Get(':key/versions')
  @ApiOperation({ summary: '配置版本历史' })
  versions(@CurrentUser() user: AuthUser, @Param('key') key: string) { return this.configs.versions(user, key); }
}
