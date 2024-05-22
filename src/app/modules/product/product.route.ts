import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.allProducts);

router
  .route('/:productId')
  .get(productController.singleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export const productRouter = router;
