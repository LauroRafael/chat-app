import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { ChatGateway } from './chat/chat.gateway';
import { User } from './users/user.entity';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Message],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    UsersModule,
    AuthModule,
    MessagesModule,
    QueueModule,
    // outros módulos
  ],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class AppModule {}
