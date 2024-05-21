import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.allProducts);

router.route('/:productId').get(productController.singleProduct);

export const productRouter = router;
