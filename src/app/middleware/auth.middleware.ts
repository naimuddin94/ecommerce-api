import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError, asyncHandler } from '../../utils';
import config from '../config';
import User from '../modules/user/user.model'; // Adjust the import path accordingly

const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new ApiError(401, 'Unauthorized request');
      }

      // Verify the token and cast to JwtPayload
      const decodedToken = jwt.verify(
        token,
        config.access_token_secret!,
      ) as jwt.JwtPayload;

      // Check for the _id property in the decoded token
      if (!decodedToken._id) {
        throw new ApiError(401, 'Invalid access token');
      }

      // Find the user by _id
      const user = await User.findById(decodedToken._id);

      if (!user) {
        throw new ApiError(401, 'Invalid access token');
      }

      req.user = user;
      next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new ApiError(401, error?.message || 'Invalid access token');
    }
  },
);

export { verifyToken };
