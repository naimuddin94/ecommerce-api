import ApiError from './ApiError';
import ApiResponse from './ApiResponse';
import asyncHandler from './asyncHandler';

// JWT configuration
const options = {
  httpOnly: true,
  secure: true,
};

export { ApiError, ApiResponse, asyncHandler, options };
