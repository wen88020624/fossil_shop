import { Order } from '../entities/order';
import orderModel from '../models/order.model';

async function saveAllOrders(orders: Order[]) {
    const savedOrders = await orderModel.saveAllOrders(orders);
    return savedOrders;
}

export default {
    saveAllOrders
};

