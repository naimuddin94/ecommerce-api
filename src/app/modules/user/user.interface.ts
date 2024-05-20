/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { z } from 'zod';
import { userValidationSchema } from './user.validator';

export interface IUser extends z.infer<typeof userValidationSchema> {}

export interface IUserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser | null>;
  isPasswordCorrect(password: string): boolean;
}
