import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, senha: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(senha, user.senha))) {
            const { senha, ...rest } = user;
            return rest;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
