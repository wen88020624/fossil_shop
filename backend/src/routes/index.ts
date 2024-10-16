import express, { Router } from 'express';
import ordersRouter from "./order.router";
import productTypeRouter from "./product_type.router";

const router: Router = express.Router();

router.use('/api/orders', ordersRouter);
router.use('/api/product-types', productTypeRouter);

export default router;
