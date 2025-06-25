import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from '../messages/message.entity';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  sendMessage(message: Message) {
    this.server.emit(`mensagem:${message.para}`, message);
  }
}
