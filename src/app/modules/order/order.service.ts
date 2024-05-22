import { ApiError } from '../../../utils';
import Product from '../product/product.model';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';

// New order save to the database
const orderSaveToDB = async (orderData: IOrder) => {
  const product = await Product.findById(orderData.productId);

  if (!product) {
    throw new ApiError(
      404,
      'Product not found please provide a valid product id',
    );
  }

  const user = await User.findOne({ email: orderData.email });

  if (!user) {
    throw new ApiError(404, 'User not found please provide a valid user email');
  }

  const isAvailableProduct = product.inventory.quantity >= orderData.quantity;

  if (!isAvailableProduct) {
    throw new ApiError(400, 'Insufficient quantity available in inventory');
  }

  const result = await Order.create(orderData);

  if (result) {
    product.inventory.quantity -= orderData.quantity;
    await product.save({ validateBeforeSave: false });
  }

  return result;
};

// Fetched order data from database
const fetchOrdersFromDB = async (email: string) => {
  let query = {};

  if (email) {
    query = { email: email.toLowerCase() };
  }

  return await Order.find(query);
};

export const orderService = {
  orderSaveToDB,
  fetchOrdersFromDB,
};
