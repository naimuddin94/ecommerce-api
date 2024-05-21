import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  productId: z.string({ message: 'Product id is required' }),
  price: z.number({ message: 'Price is required in' }),
  quantity: z.number({ message: 'Quantity is required' }),
});
