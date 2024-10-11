import orderModel from '../models/order.model';

async function buyerBarChart() {
    const data = await orderModel.buyerBarChart();
    return data.map(item => ({
        category: item.buyer,
        value: Number(item.total_income)
    }))
    .sort((a, b) => b.value - a.value);
}

async function monthBarChart() {
    const data = await orderModel.monthBarChart();
    return data.map(item => ({
        category: item.yearMonth,
        value: Number(item.totalIncome)
    }))
    .sort((a, b) => new Date(a.category).getTime() - new Date(b.category).getTime());
}

export default {
    buyerBarChart,
    monthBarChart
};
