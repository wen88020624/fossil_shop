import orderModel from "../models/order.model";

async function add(orderData: { id: string, product_type: string, product_name: string, sale_price: number, buyer_name: string, income: number, receiver_name: string, sale_date: Date }) {
    return orderModel.add(orderData);
}

async function deleteOrder(orderData: { id: string }) {
    return orderModel.remove(orderData.id);
}

async function update(orderData: { id: string, product_type: string, product_name?: string, sale_price?: number, buyer_name?: string, income?: number, receiver_name?: string, sale_date?: Date }) {
    return orderModel.update(orderData.id, orderData);
}

async function findAll() {
    const orders = await orderModel.findAll();
    return orders.map(order => ({
        ...order,
        sale_price: Math.round(order.sale_price),
        income: Math.round(order.income),
        sale_date: order.sale_date.toISOString().split('T')[0]
    }));
}

export default {
    add,
    deleteOrder,
    update,
    findAll
};
