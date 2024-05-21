/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { z } from 'zod';
import {
  inventoryValidationSchema,
  productValidationSchema,
  variantValidationSchema,
} from './product.validator';

export interface IProduct extends z.infer<typeof productValidationSchema> {}
export interface IVariant extends z.infer<typeof variantValidationSchema> {}
export interface IInventory extends z.infer<typeof inventoryValidationSchema> {}

export interface IProductMethods {}

export interface IProductModel
  extends Model<IProduct, Record<string, never>, IProductMethods> {}
