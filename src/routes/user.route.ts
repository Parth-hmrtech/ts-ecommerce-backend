import express from 'express';
import multer from 'multer';

import {
    getUserController,
    resetPasswordController,
    updateUserController
} from '../controllers/user.controller.ts';
import { userAuthMiddleware } from '../middleware/auth.middleware.ts';

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' }); // or use custom storage


router.get('/profile', userAuthMiddleware, getUserController);
router.put('/profile/:id', userAuthMiddleware, upload.single('image'), updateUserController);
router.post('/reset-password', userAuthMiddleware, resetPasswordController);

export default router;
