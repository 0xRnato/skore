import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  public async create(userData: User): Promise<IUser> {
    const newUser = new this.model(userData);
    await newUser.save();
    const result = this.parseData(newUser);
    return result;
  }

  public async findAll() {
    const users = await this.model.find().exec();
    return users.map((_user) => this.parseData(_user));
  }

  public async findById(id: number) {
    // ...
  }

  public async update(user: User) {
    // ...
  }

  public async remove(user: User) {
    // ...
  }

  private parseData(data: User): IUser {
    return {
      id: data.id,
      name: data.name,
      age: data.age,
      active: data.active,
    };
  }

  private async findData(id: string): Promise<User> {
    try {
      const data = await this.model.findById(id).exec();
      if (!data) {
        throw new Error();
      }
      return data;
    } catch (error) {
      throw new NotFoundException(`Could not find data with id: ${id}`);
    }
  }
}
