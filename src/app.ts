/*
 * Title: A Ecommerce Backend Application
 * Description: Common ecommerce backend application with full functionality
 * Author: Md Naim Uddin
 * Date: 20/05/2024
 *
 */

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { userRouter } from './app/modules/user/user.route';
import globalErrorHandler from './lib/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

// Application routes
app.use('/api/users', userRouter);

// Not-Found routes error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

// Global error handler
app.use(globalErrorHandler);

export default app;
