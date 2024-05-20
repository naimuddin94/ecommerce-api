import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.object({
    firstName: z
      .string({ message: 'First name is required' })
      .max(20, { message: 'First name is not longer than 20 characters' }),
    lastName: z
      .string({ message: 'Last name is required' })
      .max(20, { message: 'Last name is not longer than 20 characters' }),
  }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password is at least 6 characters' })
    .max(20, { message: 'Password is no longer than 20 characters' }),
  address: z.string({ message: 'Address is required' }),
  contactNo: z
    .string({ message: 'Contact is required' })
    .max(11, { message: 'Please enter a valid mobile number without +88' }),
  lastLogin: z.optional(
    z.date({ message: 'Last login is must be date format' }),
  ),
  lastLogout: z.optional(
    z.date({ message: 'Last logout is must be date format' }),
  ),
  isApproved: z.optional(z.boolean()),
});