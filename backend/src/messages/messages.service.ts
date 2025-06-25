import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MessagesService {
    constructor(@InjectQueue('mensagens') private queue: Queue) { }

    async sendMessage(de: number, para: number, texto: string) {
        await this.queue.add('enviar', { de, para, texto });
        return { status: 'Mensagem enfileirada' };
    }
}
