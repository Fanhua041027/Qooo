import { Module } from '@nestjs/common';
import { FarmModule } from '../farm/farm.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({ imports: [FarmModule], controllers: [TaskController], providers: [TaskService] })
export class TaskModule {}
