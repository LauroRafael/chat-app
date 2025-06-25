import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../messages/message.entity';
import { QueueService } from './queue.service';
import { ChatGateway } from '../chat/chat.gateway';
import { AppModule } from '../app.module'; // se necessário

@Module({
  imports: [
    BullModule.registerQueue({ name: 'mensagens' }),
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [QueueService, ChatGateway], // ou ChatModule
})
export class QueueModule {}
