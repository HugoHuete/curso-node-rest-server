import { router as userRouter } from '../routes/users.router.js';
import { router as authRouter } from '../routes/auth.router.js';
import { router as categoriesRouter } from '../routes/categories.router.js';
import { router as productsRouter } from '../routes/products.router.js';
import { router as searchRouter } from '../routes/search.router.js';
import { router as uploadRouter } from '../routes/upload.router.js';
import { Router } from 'express';

export const routerApi = (app) => {
    const router = Router();
    app.use('/api', router)
    router.use('/auth', authRouter);
    router.use('/categories', categoriesRouter);
    router.use('/products', productsRouter);
    router.use('/search', searchRouter);
    router.use('/uploads', uploadRouter);
    router.use('/users', userRouter);
};
