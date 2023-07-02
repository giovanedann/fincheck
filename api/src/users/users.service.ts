import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    const isEmailAlreadyTaken = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (isEmailAlreadyTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
