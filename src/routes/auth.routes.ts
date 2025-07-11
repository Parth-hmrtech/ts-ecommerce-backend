import express from 'express';
import multer from 'multer';
import {
  createUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
} from '../controllers/auth.controller'; 
import { userAuthMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

router.post('/register', upload.single('image'), createUserController);
router.post('/login', loginUserController);
router.post('/logout', userAuthMiddleware, logoutUserController);
router.post('/forgot-password', forgotPasswordController);

export default router;
