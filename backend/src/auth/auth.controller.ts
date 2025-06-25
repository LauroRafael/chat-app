import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() body: { email: string; senha: string }) {
        const user = await this.authService.validateUser(body.email, body.senha);
        return this.authService.login(user);
    }
}
