import { Router } from 'express';
import { orderController } from './order.controller';

const router = Router();

router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.fetchAllOrders);

export const orderRouter = router;
