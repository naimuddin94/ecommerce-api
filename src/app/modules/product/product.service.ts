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
const fetchAllProductFromDB = async (searchTerm?: string) => {
  let query = {};

  // If searchTerm is provided, build the query with regex
  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  return await Product.find(query);
};

// Update product by id
const updateProductToDB = async (
  id: string,
  updateProductData: Partial<IProduct>,
) => {
  if (
    updateProductData.inventory &&
    typeof updateProductData.inventory.quantity !== 'undefined'
  ) {
    updateProductData.inventory.inStock =
      updateProductData.inventory.quantity > 0;
  }

  return await Product.findByIdAndUpdate(id, updateProductData, { new: true });
};

// Delete product by id from database
const deleteProductFromDB = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, 'Invalid product id');
  }

  return await Product.findByIdAndDelete(id);
};

export const productService = {
  saveProductToDB,
  fetchSingleProductFromDB,
  fetchAllProductFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
