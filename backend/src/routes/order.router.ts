import express, { Router } from 'express';
import orderController from '../controllers/order.controller';
import uploadController from '../controllers/upload.controller';
import { celebrate } from 'celebrate';
import validate from '../middleware/validations/order.validation';

const router: Router = express.Router();

router.route('/add')
    .post(celebrate(validate.add), orderController.add);

router.route('/delete')
    .post(celebrate(validate.delete), orderController.deleteOrder);

router.route('/update')
    .post(celebrate(validate.update), orderController.update);

router.route('/findAll')
    .post(orderController.findAll);

router.route('/uploadCSV')
    .post(uploadController.uploadOrder);

export default router;
