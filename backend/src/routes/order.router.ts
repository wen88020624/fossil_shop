import express, { Router } from 'express';
import ctrl from '../controllers/order.controller';
import { celebrate } from 'celebrate';
import validate from '../middleware/validations/order.validation';

const router: Router = express.Router();

router.route('/add')
    .post(celebrate(validate.add), ctrl.add);

router.route('/delete')
    .post(celebrate(validate.delete), ctrl.deleteOrder);

router.route('/update')
    .post(celebrate(validate.update), ctrl.update);

router.route('/findAll')
    .post(ctrl.findAll);

export default router;
