// src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
// import cartRoutes from './routes/cart.routes.js';
// import userRoutes from './routes/user.routes.js';
// import categoryRoutes from './routes/category.routes.js';

const app = express();

// ✅ Global middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Create router container (server.js mounts this under /api)
const router = express.Router();

// ✅ Public auth routes
router.use('/auth', authRoutes);

// ✅ Product routes (public browsing, admin protected inside file)
router.use('/products', productRoutes);

// ✅ Admin routes (protected inside route middleware)
router.use('/admin', adminRoutes);

// ✅ Wishlist (user-protected inside route)
router.use('/wishlist', wishlistRoutes);

// Future routes (uncomment when needed)
// router.use('/cart', cartRoutes);
// router.use('/users', userRoutes);
// router.use('/categories', categoryRoutes);

export default router;

