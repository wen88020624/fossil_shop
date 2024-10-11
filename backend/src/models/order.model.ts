import { Order } from '../entities/order';
import { AppDataSource } from '../config/data-source';
async function add(orderData: { id: string, product_type: string, product_name: string, sale_price: number, buyer_name: string, income: number, receiver_name: string, sale_date: Date }) {
    const order = new Order();
    // TODO 待修正
    const { id, ...orderDataWithoutId } = orderData;
    Object.assign(order, orderDataWithoutId);
    return order.save();
}

async function remove(id: string) {
    const order = await Order.findOneBy({ id: id });
    if (!order) throw new Error('Order not found');
    return order.remove();
}

async function update(id: string, orderData: Partial<Order>) {
    const order = await Order.findOneBy({ id: id });
    if (!order) {
        throw new Error('Order not found');
    }
    Object.assign(order, orderData);
    return order.save();
}

async function findAll() {
    return Order.find();
}

async function saveAllOrders(orders: Order[]) {
    console.log(orders);
    return Order.save(orders);
}

async function buyerBarChart() {
    const result = await AppDataSource.manager.createQueryBuilder(Order, 'order')
        .select('order.buyer_name', 'buyer')
        .addSelect('SUM(order.income)', 'total_income')
        .groupBy('order.buyer_name')
        .getRawMany();
    return result;
}

export default {
    add,
    remove,
    update,
    findAll,
    saveAllOrders,
    buyerBarChart
};