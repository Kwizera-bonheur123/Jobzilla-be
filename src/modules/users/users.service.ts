import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/database/constants';
import { User } from './user.entity';
import { createUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  async create(user: createUserDto): Promise<User> {
    return await this.userRepository.create(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
