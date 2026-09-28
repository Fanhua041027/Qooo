import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import * as Minio from 'minio';
import { ApiError } from '../../common/api-error';
import { ErrorCode } from '../../common/error-codes';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class FileService implements OnModuleInit {
  private readonly client: Minio.Client;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {
    this.bucket = config.get('MINIO_BUCKET', 'diagnosis-media');
    this.client = new Minio.Client({
      endPoint: config.get('MINIO_ENDPOINT', 'localhost'),
      port: Number(config.get('MINIO_PORT', 9000)),
      useSSL: config.get('MINIO_USE_SSL', 'false') === 'true',
      accessKey: config.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: config.getOrThrow<string>('MINIO_SECRET_KEY'),
    });
  }

  async onModuleInit() {
    if (!(await this.client.bucketExists(this.bucket))) await this.client.makeBucket(this.bucket);
  }

  async createUpload(userId: string, input: CreateUploadDto) {
    const purpose = input.purpose === 'avatar' ? 'avatars' : 'diagnoses';
    const objectKey = `users/${userId}/${purpose}/${randomUUID()}.${input.extension}`;
    const file = await this.prisma.fileObject.create({
      data: {
        userId,
        objectKey,
        bucket: this.bucket,
        contentType: input.contentType,
        size: input.size,
      },
    });
    try {
      const uploadUrl = await this.client.presignedPutObject(this.bucket, objectKey, 15 * 60);
      return { fileId: file.id, objectKey, uploadUrl, expiresIn: 900, method: 'PUT', contentType: input.contentType };
    } catch {
      await this.prisma.fileObject.delete({ where: { id: file.id } });
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '对象存储暂时不可用，请稍后重试', HttpStatus.BAD_GATEWAY);
    }
  }

  async completeUpload(userId: string, fileId: string) {
    const file = await this.requireFile(userId, fileId);
    try {
      const stat = await this.client.statObject(file.bucket, file.objectKey);
      return this.prisma.fileObject.update({
        where: { id: file.id },
        data: { status: 'ready', size: stat.size },
      });
    } catch {
      throw new ApiError(ErrorCode.FILE_NOT_FOUND, '对象存储中尚未找到该文件，请重新上传', HttpStatus.BAD_REQUEST);
    }
  }

  async accessUrl(userId: string, fileId: string) {
    const file = await this.requireFile(userId, fileId);
    if (file.status !== 'ready') {
      throw new ApiError(ErrorCode.FILE_NOT_FOUND, '文件尚未上传完成', HttpStatus.CONFLICT);
    }
    return { url: await this.client.presignedGetObject(file.bucket, file.objectKey, 15 * 60), expiresIn: 900 };
  }

  async health() {
    return this.client.bucketExists(this.bucket);
  }

  async readImageAsDataUrl(objectKey: string) {
    const file = await this.prisma.fileObject.findUnique({ where: { objectKey } });
    if (!file || file.status !== 'ready') {
      throw new ApiError(ErrorCode.FILE_NOT_FOUND, '诊断图片不存在或尚未上传完成', HttpStatus.NOT_FOUND);
    }
    if (!file.contentType.startsWith('image/')) {
      throw new ApiError(ErrorCode.FILE_TYPE_NOT_ALLOWED, '诊断文件不是支持的图片格式', HttpStatus.BAD_REQUEST);
    }

    try {
      const stream = await this.client.getObject(file.bucket, file.objectKey);
      const chunks: Buffer[] = [];
      let totalBytes = 0;
      for await (const chunk of stream) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        totalBytes += buffer.length;
        if (totalBytes > 20 * 1024 * 1024) {
          stream.destroy();
          throw new ApiError(ErrorCode.FILE_TYPE_NOT_ALLOWED, '单张诊断图片不能超过 20 MB', HttpStatus.BAD_REQUEST);
        }
        chunks.push(buffer);
      }
      return `data:${file.contentType};base64,${Buffer.concat(chunks).toString('base64')}`;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(ErrorCode.STORAGE_UNAVAILABLE, '读取诊断图片失败', HttpStatus.BAD_GATEWAY);
    }
  }

  private async requireFile(userId: string, fileId: string) {
    const file = await this.prisma.fileObject.findFirst({ where: { id: fileId, userId } });
    if (!file) throw new ApiError(ErrorCode.FILE_NOT_FOUND, '文件不存在', HttpStatus.NOT_FOUND);
    return file;
  }
}
