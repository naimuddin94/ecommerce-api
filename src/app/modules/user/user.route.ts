import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.route('/').post(userController.createUser);
router.route('/login').post(userController.login);

export const userRouter = router;
