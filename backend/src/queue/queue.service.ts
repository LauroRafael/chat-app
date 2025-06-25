import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../messages/message.entity';
import { ChatGateway } from '../chat/chat.gateway';

@Processor('mensagens')
export class QueueService {
    constructor(
        @InjectRepository(Message) private repo: Repository<Message>,
        private readonly chat: ChatGateway
    ) { }

    @Process('enviar')
    async handleMessage(job: Job) {
        const msg = this.repo.create(job.data);
        const saved = await this.repo.save(msg);
        if (Array.isArray(saved)) {
            saved.forEach(message => this.chat.sendMessage(message));
        } else {
            this.chat.sendMessage(saved);
        }
    }
}
