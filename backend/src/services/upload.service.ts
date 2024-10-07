import orderModel from "../models/order.model";



async function saveAllOrders() {
    const orders = await orderModel.findAll();
    return orders.map(order => ({
        ...order,
        sale_price: Math.round(order.sale_price),
        income: Math.round(order.income),
        sale_date: order.sale_date.toISOString().split('T')[0]
    }));
}

export default {
    saveAllOrders
};

