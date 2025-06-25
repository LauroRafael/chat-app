import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async create(nome: string, email: string, senha: string): Promise<User> {
        const hash = await bcrypt.hash(senha, 10);
        const user = this.repo.create({ nome, email, senha: hash });
        return this.repo.save(user);
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    findAll() {
        return this.repo.find({ select: ['id', 'nome', 'email'] });
    }
}
