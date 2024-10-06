import express, { Router } from 'express';
import ordersRouter from "./order.router"

const router: Router = express.Router();
router.use('/api', ordersRouter);

export default router;