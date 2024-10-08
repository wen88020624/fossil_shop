import { Request, Response } from 'express';
import { Order } from '../entities/order';
import uploadService from '../services/upload.service';

export const uploadOrders = async (req: Request, res: Response) => {
    try {
        const orders: Order[] = req.body;
        const result = await uploadService.saveAllOrders(orders);
        res.json(result);
    } catch (error) {
        console.error('Error in uploadJSON:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    uploadOrders
};
