import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { CompleteTaskDto, CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@ApiTags('农事任务')
@ApiBearerAuth()
@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly tasks: TaskService) {}

  @Get()
  @ApiOperation({ summary: '任务列表，自动标记逾期任务' })
  list(@CurrentUser() user: AuthUser) {
    return this.tasks.list(user.id);
  }

  @Post()
  @ApiOperation({ summary: '创建任务，可由诊断建议转入' })
  create(@CurrentUser() user: AuthUser, @Body() input: CreateTaskDto) {
    return this.tasks.create(user.id, input);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新任务' })
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() input: UpdateTaskDto) {
    return this.tasks.update(user.id, id, input);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: '完成任务' })
  complete(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() input: CompleteTaskDto) {
    return this.tasks.complete(user.id, id, input);
  }
}
