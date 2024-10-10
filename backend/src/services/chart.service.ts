import orderModel from '../models/order.model';

async function buyerBarChart() {
    const data = await orderModel.buyerBarChart();
    return data;
}

export default {
    buyerBarChart
};
