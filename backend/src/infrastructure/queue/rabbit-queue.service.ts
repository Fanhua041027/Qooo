import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { Channel, ChannelModel, ConsumeMessage } from 'amqplib';

type MessageHandler<T> = (payload: T) => Promise<void>;

@Injectable()
export class RabbitQueueService implements OnModuleInit, OnModuleDestroy {
  private connection?: ChannelModel;
  private channel?: Channel;
  private readonly handlers = new Map<string, MessageHandler<unknown>>();

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.connection = await amqp.connect(this.config.getOrThrow<string>('RABBITMQ_URL'));
    this.channel = await this.connection.createChannel();
    await this.channel.prefetch(4);

    for (const queue of this.handlers.keys()) await this.startConsumer(queue);
  }

  registerHandler<T>(queue: string, handler: MessageHandler<T>) {
    this.handlers.set(queue, handler as MessageHandler<unknown>);
    if (this.channel) void this.startConsumer(queue);
  }

  async publish<T>(queue: string, payload: T) {
    if (!this.channel) throw new Error('RabbitMQ 尚未连接');
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      contentType: 'application/json',
    });
  }

  async ping() {
    if (!this.channel) return false;
    await this.channel.assertQueue('diagnosis.analyze', { durable: true });
    return true;
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  private async startConsumer(queue: string) {
    if (!this.channel) return;
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.consume(queue, (message) => void this.handleMessage(queue, message), { noAck: false });
  }

  private async handleMessage(queue: string, message: ConsumeMessage | null) {
    if (!message || !this.channel) return;
    const handler = this.handlers.get(queue);
    if (!handler) {
      this.channel.nack(message, false, true);
      return;
    }

    try {
      await handler(JSON.parse(message.content.toString()) as unknown);
      this.channel.ack(message);
    } catch (error) {
      console.error(`队列 ${queue} 处理失败`, error);
      this.channel.nack(message, false, false);
    }
  }
}
