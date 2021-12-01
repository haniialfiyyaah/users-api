import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';

import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 8);
  }
}
