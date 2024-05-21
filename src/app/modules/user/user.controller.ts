import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler, options } from '../../../utils';
import { userService } from './user.service';
import { userValidationSchema } from './user.validator';

// Create a new user
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body;
  const { error, data } = userValidationSchema.safeParse(user);

  if (error) {
    throw new ApiError(
      400,
      error.issues.map((err) => err.message).join(' and '),
      error.issues,
    );
  }

  const result = await userService.savedUserToDB(data);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Account created successfully'));
});

// Authentication the user
const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await userService.loginUser(
    email,
    password,
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        'Login successfully',
      ),
    );
});

// Logout user and remove tokens
const logout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, 'Invalid user');
  }
  await userService.logoutUser(userId);

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'Logout successfully'));
});

export const userController = {
  createUser,
  login,
  logout,
};
