import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class KnowledgeService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query?: string, cropName?: string) {
    const items = await this.prisma.knowledgeArticle.findMany({
      where: {
        published: true,
        cropName,
        OR: query
          ? [{ title: { contains: query, mode: 'insensitive' } }, { summary: { contains: query, mode: 'insensitive' } }]
          : undefined,
      },
      select: { id: true, slug: true, title: true, summary: true, cropName: true, tags: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
    return { items, total: items.length };
  }
}
