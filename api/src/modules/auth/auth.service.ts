import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    public readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
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

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signUp({ email, name, password }: SignUpDto) {
    const isEmailAlreadyTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (isEmailAlreadyTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // income
              { name: 'Salary', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Other', icon: 'other', type: 'INCOME' },

              // expense
              { name: 'Home', icon: 'home', type: 'EXPENSE' },
              { name: 'Food', icon: 'food', type: 'EXPENSE' },
              { name: 'Education', icon: 'education', type: 'EXPENSE' },
              { name: 'Fun', icon: 'fun', type: 'EXPENSE' },
              { name: 'Grocery', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Clothes', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transport', icon: 'transport', type: 'EXPENSE' },
              { name: 'Travel', icon: 'travel', type: 'EXPENSE' },
              { name: 'Other', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
