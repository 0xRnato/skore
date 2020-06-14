import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  active: { type: Boolean, required: true },
});

export interface IUser {
  id: string;
  name: string;
  age: number;
  active: boolean;
}

export interface User extends IUser, mongoose.Document {
  id: string;
}
