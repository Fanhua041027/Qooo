import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FileService } from './file.service';

@ApiTags('文件')
@ApiBearerAuth()
@Controller('v1/files')
export class FileController {
  constructor(private readonly files: FileService) {}

  @Post('upload-url')
  @ApiOperation({ summary: '获取 15 分钟有效的对象存储上传 URL' })
  uploadUrl(@CurrentUser() user: AuthUser, @Body() input: CreateUploadDto) {
    return this.files.createUpload(user.id, input);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: '上传结束后确认文件存在' })
  complete(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.files.completeUpload(user.id, id);
  }

  @Get(':id/access-url')
  @ApiOperation({ summary: '获取 15 分钟有效的临时访问 URL' })
  accessUrl(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.files.accessUrl(user.id, id);
  }
}
