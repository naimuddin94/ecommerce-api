import { Router } from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { userController } from './user.controller';

const router = Router();

router.route('/').post(userController.createUser);
router.route('/login').post(userController.login);
router.route('/logout').post(verifyToken, userController.logout);

export const userRouter = router;
