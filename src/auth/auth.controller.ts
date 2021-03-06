import { Controller, Post, Body, ValidationPipe, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../user/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) credentials: { user: RegisterDTO }) {
    return this.authService.register(credentials.user);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: { user: LoginDTO }) {
    return this.authService.login(credentials.user);
  }
}
