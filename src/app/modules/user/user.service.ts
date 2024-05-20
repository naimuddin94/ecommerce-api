import { ApiError } from '../../../utils';
import { IUser } from './user.interface';
import User from './user.model';

// Create a new user
const savedUserToDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.email)) {
    throw new ApiError(400, 'User already exists');
  }
  return await User.create(userData);
};

export const userService = {
  savedUserToDB,
};
