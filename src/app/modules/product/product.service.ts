import { ApiError } from '../../../utils';
import { IProduct } from './product.interface';
import Product from './product.model';

// Save a new product to the database
const saveProductToDB = async (productData: IProduct) => {
  if (await Product.isProductNameExists(productData.name)) {
    throw new ApiError(400, 'Product name already exists');
  }
  return await Product.create(productData);
};

// Fetched single product from the database
const fetchSingleProductFromDB = async (productId: string) => {
  return await Product.findById(productId);
};

// Fetched all products from the database
const fetchAllProductFromDB = async () => {
  return await Product.find({});
};

export const productService = {
  saveProductToDB,
  fetchSingleProductFromDB,
  fetchAllProductFromDB,
};
