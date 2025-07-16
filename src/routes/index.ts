import { Router } from 'express';
import authRoutes from '@/routes/auth.routes';
import categoriesRoutes from '@/routes/category.routes';
import productsRoutes from '@/routes/product.routes';
import cartRoutes from '@/routes/cart.routes';
import orderRoutes from '@/routes/order.routes';
import paymentRoutes from '@/routes/payment.routes';
import reviewRoutes from '@/routes/review.route';
import userRoutes from '@/routes/user.route';

const router = Router();

router.use('/auth', authRoutes);
router.use(userRoutes);
router.use(categoriesRoutes);
router.use(productsRoutes);
router.use(cartRoutes);
router.use(orderRoutes);
router.use(paymentRoutes);
router.use(reviewRoutes);

export default router;