import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() authenticateDto: SignInDto) {
    return this.authService.signIn(authenticateDto);
  }

  @Post('signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
