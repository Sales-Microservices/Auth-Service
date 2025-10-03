import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUser, RegisterUser } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('register-user')
  async registerUser(@Payload() dto: RegisterUser) { }

  @MessagePattern('login-user')
  async loginUser(@Payload() dto: LoginUser) { }

  @MessagePattern('validate-user')
  async validateUser() { }

}
