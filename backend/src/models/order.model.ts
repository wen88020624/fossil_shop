import { Order } from '../entities/order';
import { AppDataSource } from '../config/data-source';
async function add(orderData: Order) {
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

async function monthBarChart() {
    const result = await AppDataSource.manager.createQueryBuilder(Order, 'order')
        .select("TO_CHAR(order.sale_date, 'YYYY-MM')", "yearMonth")
        .addSelect("SUM(order.income)", "totalIncome")
        .groupBy("TO_CHAR(order.sale_date, 'YYYY-MM')")
        .getRawMany();
    return result;
}

export default {
    add,
    remove,
    update,
    findAll,
    saveAllOrders,
    buyerBarChart,
    monthBarChart
};
