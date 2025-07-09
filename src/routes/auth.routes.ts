import express from 'express';
import multer from 'multer';
import {
  createUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
} from '../controllers/auth.controller'; // ✅ no .js extension in TypeScript
import { userAuthMiddleware } from '../middleware/auth.middleware'; // ✅ no .ts extension

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Register with image upload
router.post('/register', upload.single('image'), createUserController);

// ✅ Login
router.post('/login', loginUserController);

// ✅ Logout (requires auth middleware)
router.post('/logout', userAuthMiddleware, logoutUserController);

// ✅ Forgot password
router.post('/forgot-password', forgotPasswordController);

export default router;
