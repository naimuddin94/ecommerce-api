import { z } from 'zod';

// Define the schema for a product variant
export const variantValidationSchema = z.object({
  type: z.string({ message: 'Variant type is required' }).trim(),
  value: z.string({ message: 'Variant value is required' }).trim(),
});

// Define the schema for the product inventory
export const inventoryValidationSchema = z.object({
  quantity: z
    .number({ message: 'Inventory quantity is required' })
    .int()
    .min(0, { message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean({ message: 'InStock status is required' }).optional(),
});

// Define the main product validation schema
export const productValidationSchema = z.object({
  name: z
    .string({ message: 'Product name is required' })
    .trim()
    .min(3, { message: 'Product name must be at least 3 characters' })
    .max(30, { message: 'Product name no longer than 30 characters' }),
  description: z
    .string({ message: 'Product description is required' })
    .trim()
    .min(30, { message: 'Description must be at least 30 characters' })
    .max(400, { message: 'Description no longer than 400 characters' }),
  price: z
    .number({ message: 'Product price is required' })
    .positive({ message: 'Price must be a positive number' }),
  category: z.string({ message: 'Product category is required' }).trim(),
  tags: z.array(
    z
      .string({ message: 'Each tag must be a string' })
      .trim()
      .min(3, { message: 'Tag must be at least 3 characters' })
      .max(30, { message: 'Tag no longer than 30 characters' }),
  ),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
  isApproved: z.boolean().optional(),
});
