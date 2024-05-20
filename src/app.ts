import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

export default app;
