import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly uuidService: UuidService,
  ) {}
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

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
    //hash the password
    const pass = await this.hashPassword(user.password);
    const newUser = await this.usersService.create({
      ...user,
      id: this.uuidService.generate({ version: 4 }),
      password: pass,
      role: 'CANDIDATE',
      isVerified: false,
      isPasswordExpired: false,
      lastTimePasswordUpdated: new Date(),
      isActive: true,
    });

    //Genarate token
    const token = await this.generateToken(newUser.dataValues);
    return { user: newUser.dataValues, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private async comparePassword(enteredPassword, dbPassword) {
    const macth = await bcrypt.compare(enteredPassword, dbPassword);
    return macth;
  }
}
