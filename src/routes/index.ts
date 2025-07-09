import { Router } from 'express';
import authRoutes from './auth.routes';
// import categoriesRoutes from './category.routes.js';
// import productsRoutes from './product.routes.js';
// import cartRoutes from './cart.routes.js';
// import orderRoutes from './order.routes.js';
// import paymentRoutes from './payment.routes.js';
// import reviewRoutes from './review.route.js';
// import userRoutes from './user.route.js';

const router = Router();

router.use('/auth', authRoutes);
// router.use(userRoutes);
// router.use(categoriesRoutes);
// router.use(productsRoutes);
// router.use(cartRoutes);
// router.use(orderRoutes);
// router.use(paymentRoutes);
// router.use(reviewRoutes);

export default router;