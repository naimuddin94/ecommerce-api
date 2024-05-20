/* eslint-disable no-unused-vars */
import { Model, HydratedDocument } from 'mongoose';
import { z } from 'zod';
import { nameValidationSchema, userValidationSchema } from './user.validator';

export interface IUser extends z.infer<typeof userValidationSchema> {}
export interface IName extends z.infer<typeof nameValidationSchema> {}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, Record<string, never>, IUserMethods> {
  isUserExists(email: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}