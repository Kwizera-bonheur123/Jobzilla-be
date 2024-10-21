import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    return user.dataValues;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const macth = await bcrypt.compare(enteredPassword, dbPassword);
    return macth;
  }
}
