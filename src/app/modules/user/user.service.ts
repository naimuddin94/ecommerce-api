import mongoose from 'mongoose';
import { ApiError } from '../../../utils';
import { IUser } from './user.interface';
import User from './user.model';

// Save user to database
const savedUserToDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.email)) {
    throw new ApiError(400, 'User already exists');
  }
  return await User.create(userData);
};

// Fetched all users from the database
const fetchedUsersToDB = async () => {
  return await User.find({}).select('-password');
};

// Fetched single user from the database
const fetchedSingleUserToDB = async (id: string) => {
  return await User.findById(id).select('-password');
};

// Login the user
const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const correctPassword = await user.isPasswordCorrect(password);

  if (!correctPassword) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const userResponse = await User.findById(user.id).select(
    '-password -refreshToken -__v',
  );

  return { user: userResponse, accessToken, refreshToken };
};

// Logout the user
const logoutUser = async (userId: mongoose.Types.ObjectId) => {
  const result = await User.findByIdAndUpdate(userId, {
    $set: {
      refreshToken: null,
      lastLogout: Date.now(),
    },
  });
  console.log(58, result);
};

export const userService = {
  savedUserToDB,
  fetchedUsersToDB,
  fetchedSingleUserToDB,
  loginUser,
  logoutUser,
};
