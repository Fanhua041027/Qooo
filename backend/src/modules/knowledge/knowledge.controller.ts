import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { KnowledgeService } from './knowledge.service';

@ApiTags('知识库')
@ApiBearerAuth()
@Controller('v1/knowledge')
export class KnowledgeController {
  constructor(private readonly knowledge: KnowledgeService) {}

  @Get()
  @ApiOperation({ summary: '搜索已发布的农技知识' })
  list(@Query('query') query?: string, @Query('cropName') cropName?: string) {
    return this.knowledge.list(query, cropName);
  }
}
