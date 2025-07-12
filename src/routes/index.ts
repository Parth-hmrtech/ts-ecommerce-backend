import { Router } from 'express';
import authRoutes from './auth.routes';
import categoriesRoutes from './category.routes';
import productsRoutes from './product.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import paymentRoutes from './payment.routes';
import reviewRoutes from './review.route';
import userRoutes from './user.route';

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