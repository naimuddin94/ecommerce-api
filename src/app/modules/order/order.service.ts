import { ApiError } from '../../../utils';
import Product from '../product/product.model';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';

// New order save to the database
const orderSaveToDB = async (orderData: IOrder) => {
  const result = await Product.findById(orderData.productId);

  if (!result) {
    throw new ApiError(
      404,
      'Product not found please provide a valid product id',
    );
  }

    const user = await User.findOne({ email: orderData.email });
    
     if (!user) {
       throw new ApiError(
         404,
         'User not found please provide a valid user email',
       );
    }
    
    return await Order.create(orderData);
};

export const orderService = {
  orderSaveToDB,
};
