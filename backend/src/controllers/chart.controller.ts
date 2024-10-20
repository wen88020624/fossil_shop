import { Request, Response } from 'express';
import chartService from '../services/chart.service';

export const buyerBarChart = async (req: Request, res: Response) => {
    const data = await chartService.buyerBarChart();
    res.json(data);
}

export const monthBarChart = async (req: Request, res: Response) => {
    const data = await chartService.monthBarChart();
    res.json(data);
}

export default { buyerBarChart, monthBarChart };