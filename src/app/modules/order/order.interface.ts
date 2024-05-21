import { Model } from 'mongoose';
import { z } from 'zod';
import { orderValidationSchema } from './order.validator';

export interface IOrder extends z.infer<typeof orderValidationSchema> {}

export interface IOrderMethods {}

export interface IOrderModel
  extends Model<IOrder, Record<string, never>, IOrderMethods> {}
