import express, { Router } from 'express';
import productTypeController from '../controllers/product_type.controller';

const router: Router = express.Router();

router.route('/add')
    .post(productTypeController.add);

router.route('/remove')
    .post(productTypeController.remove);

router.route('/update')
    .post(productTypeController.update);

router.route('/findAll')
    .post(productTypeController.findAll);

export default router;