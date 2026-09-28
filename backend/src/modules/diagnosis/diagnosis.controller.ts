import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { ListDiagnosisDto } from './dto/list-diagnosis.dto';
import { VerifyDiagnosisDto } from './dto/verify-diagnosis.dto';

@ApiTags('诊断')
@ApiBearerAuth()
@Controller('v1/diagnoses')
export class DiagnosisController {
  constructor(private readonly diagnoses: DiagnosisService) {}

  @Post()
  @ApiOperation({ summary: '创建异步诊断；相同 clientRequestId 返回同一记录' })
  create(@CurrentUser() user: AuthUser, @Body() input: CreateDiagnosisDto) {
    return this.diagnoses.create(user.id, input);
  }

  @Get()
  @ApiOperation({ summary: '诊断历史' })
  list(@CurrentUser() user: AuthUser, @Query() query: ListDiagnosisDto) {
    return this.diagnoses.list(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: '轮询诊断状态和结果' })
  get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.diagnoses.get(user.id, id);
  }

  @Get(':id/result')
  @ApiOperation({ summary: '诊断结果兼容别名，行为与详情轮询接口一致' })
  result(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.diagnoses.get(user.id, id);
  }

  @Post(':id/retry')
  @ApiOperation({ summary: '重试失败或需要补图的诊断' })
  retry(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.diagnoses.retry(user.id, id);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: '记录诊断后的复查结果，驱动 JEV 闭环' })
  verify(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() input: VerifyDiagnosisDto) {
    return this.diagnoses.verify(user.id, id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: '软删除诊断并保留审计数据' })
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.diagnoses.remove(user.id, id);
  }
}
