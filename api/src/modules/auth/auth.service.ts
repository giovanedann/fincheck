import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(public readonly usersRepository: UsersRepository) {}

  async authenticate({ email, password }: AuthenticateDto) {
    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { isPasswordValid };
  }
}
