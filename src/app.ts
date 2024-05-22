/*
 * Title: A Ecommerce Backend Application
 * Description: Common ecommerce backend application with full functionality
 * Author: Md Naim Uddin
 * Date: 20/05/2024
 *
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { orderRouter } from './app/modules/order/order.route';
import { productRouter } from './app/modules/product/product.route';
import { userRouter } from './app/modules/user/user.route';
import globalErrorHandler from './lib/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

// Application routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Not-Found routes error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

// Global error handler
app.use(globalErrorHandler);

export default app;
