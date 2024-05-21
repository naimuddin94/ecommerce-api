import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.route('/').post(userController.createUser);

export const userRouter = router;
