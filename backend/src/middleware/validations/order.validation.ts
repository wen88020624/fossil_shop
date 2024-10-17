import { Joi } from 'celebrate';

const orderSchema = Joi.object({
    product_type_id: Joi.number().required(),
    product_name: Joi.string().max(255).required(),
    sale_price: Joi.number().precision(2).required(),
    buyer_name: Joi.string().max(255).required(),
    income: Joi.number().precision(2).required(),
    receiver_name: Joi.string().max(255).required(),
    sale_date: Joi.date().iso().required()
}).unknown(true);

const orderIdSchema = Joi.string().uuid().required();

export default {
    add: {
        body: orderSchema
    },
    delete: {
        body: Joi.object({
            id: orderIdSchema
        }).unknown(true)
    },
    update: {
        body: Joi.object({
            id: orderIdSchema,
            product_type_id: Joi.number(),
            product_name: Joi.string().max(255),
            sale_price: Joi.number().precision(2),
            buyer_name: Joi.string().max(255),
            income: Joi.number().precision(2),
            receiver_name: Joi.string().max(255),
            sale_date: Joi.date().iso()
        }).unknown(true)
    }
};
