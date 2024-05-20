import { Schema, model } from 'mongoose';
import { IName, IUser, IUserModel } from './user.interface';

const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: nameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    lastLogout: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = model('User', userSchema);

export default User;
