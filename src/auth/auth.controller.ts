import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern('register-user')
  async registerUser() { }

  @MessagePattern('login-user')
  async loginUser() { }

  @MessagePattern('validate-user')
  async validateUser() { }

}
