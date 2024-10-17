import { Order } from "src/entities/order";
import orderModel from "../models/order.model";
import productTypeModel from "../models/product_type.model";

async function add(orderData: Order) {
    return orderModel.add(orderData);
}

async function deleteOrder(orderData: { id: string }) {
    return orderModel.remove(orderData.id);
}

async function update(orderData: Order) {
    return orderModel.update(orderData.id, orderData);
}

async function findAll() {
    const orders = await orderModel.findAll();
    const productTypes = await productTypeModel.findAll();
    const productTypeMap = new Map(productTypes.map(productType => [productType.id, productType]));
    return orders.map(order => ({
        ...order,
        sale_price: Math.round(order.sale_price),
        income: Math.round(order.income),
        sale_date: order.sale_date.toISOString().split('T')[0],
        product_type: productTypeMap.get(order.product_type_id)?.name
    }));
}

export default {
    add,
    deleteOrder,
    update,
    findAll
};
