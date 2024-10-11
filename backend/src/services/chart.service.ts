import orderModel from '../models/order.model';

async function buyerBarChart() {
    const data = await orderModel.buyerBarChart();
    return data.map(item => ({
        category: item.buyer,
        value: Number(item.total_income)
    }))
    .sort((a, b) => b.value - a.value);
}

export default {
    buyerBarChart
};
