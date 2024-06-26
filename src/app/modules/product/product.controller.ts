import { Request, Response } from 'express';
import { ApiError, ApiResponse, asyncHandler } from '../../../utils';
import { productService } from './product.service';
import { productValidationSchema } from './product.validator';

// Create a new product
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = req.body;
  const { error, data } = productValidationSchema.safeParse(product);

  if (error) {
    throw new ApiError(
      400,
      error.issues.map((err) => err.message).join(' and '),
      error.issues,
    );
  }

  const result = await productService.saveProductToDB(data);

  return res
    .status(201)
    .json(new ApiResponse(201, result, 'Product created successfully!'));
});

// Fetched single product from database by id
const singleProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productService.fetchSingleProductFromDB(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product fetched successfully!'));
});

// Fetch all products from the database
const allProducts = asyncHandler(async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  const result = await productService.fetchAllProductFromDB(
    searchTerm as string,
  );

  if (!result.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, result, 'Product not found'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product fetched successfully!'));
});

// Update product with id and updated data
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const updateData = req.body;

  const { error, data } = productValidationSchema
    .partial()
    .safeParse(updateData);

  if (error) {
    throw new ApiError(
      400,
      error.issues.map((err) => err.message).join(' and '),
      error.issues,
    );
  }

  const result = await productService.updateProductToDB(productId, data);

  if (!result) {
    throw new ApiError(500, 'Something went wrong while updating product');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Product updated successfully!'));
});

// Product delete functionality
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await productService.deleteProductFromDB(productId);

  if (!result) {
    throw new ApiError(500, 'Something went wrong while deleting product');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Product deleted successfully!'));
});

export const productController = {
  createProduct,
  singleProduct,
  allProducts,
  updateProduct,
  deleteProduct,
};
