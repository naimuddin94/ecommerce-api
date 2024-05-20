/*
 * Title: A Ecommerce Backend Application
 * Description: Common ecommerce backend application with full functionality
 * Author: Md Naim Uddin
 * Date: 20/05/2024
 *
 */

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './lib/globalErrorHandler';

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// testing route
app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

// not found error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

// global error handler
app.use(globalErrorHandler);

export default app;
