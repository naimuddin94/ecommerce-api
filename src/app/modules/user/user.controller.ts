import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../../utils';
import { userService } from './user.service';
import { userValidationSchema } from './user.validator';

// Create a new user
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body;
  const { error, data } = userValidationSchema.safeParse(user);

  if (error) {
    throw new ApiError(400, error.issues.map(err => err.message).join(' and '), error.issues);
  }

  const result = await userService.savedUserToDB(data);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Account created successfully'));
});

export const userController = {
  createUser,
};
