import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../../utils';
import { orderService } from './order.service';
import { orderValidationSchema } from './order.validator';

// Create a new order
const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = req.body;

  const { error, data } = orderValidationSchema.safeParse(order);

  if (error) {
    throw new ApiError(
      400,
      error.issues.map((err) => err.message).join(' and '),
      error.issues,
    );
  }

  const result = await orderService.orderSaveToDB(data);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Order created successfully!'));
});

// Fetch the order from the database
const fetchAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await orderService.fetchOrdersFromDB(email as string);

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Orders fetched successfully!'));
});

export const orderController = {
  createOrder,
  fetchAllOrders,
};
