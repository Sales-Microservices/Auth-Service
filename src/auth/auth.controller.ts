import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('register-user')
  async registerUser(@Payload() dto: RegisterUser) {
    return this.authService.register(dto);
  }

  @MessagePattern('login-user')
  async loginUser(@Payload() dto: LoginUser) {
    return this.authService.login(dto);
  }

  verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token)
  }

}
