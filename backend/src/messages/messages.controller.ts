import { Controller, Post, Get, Query, Body, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly service: MessagesService,
        @InjectRepository(Message) private repo: Repository<Message>
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async send(@Body() body: { de: number; para: number; texto: string }) {
        return this.service.sendMessage(body.de, body.para, body.texto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Query('de') de: number, @Query('para') para: number) {
        return this.repo.find({
            where: [
                { de, para },
                { de: para, para: de }
            ],
            order: { createdAt: 'ASC' },
        });
    }
}
