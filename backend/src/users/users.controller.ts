import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Post()
    create(@Body() body: { nome: string; email: string; senha: string }) {
        return this.service.create(body.nome, body.email, body.senha);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
}
