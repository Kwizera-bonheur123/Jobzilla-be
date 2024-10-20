import { UUID } from 'crypto';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: UUID;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['CANDIDATE', 'ADMIN', 'EMPLOYER'],
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isPasswordExpired: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  lastTimePasswordUpdated: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
