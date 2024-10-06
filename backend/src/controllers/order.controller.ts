import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { Order } from '../entities/order';

export const add = async (req: Request, res: Response) => {
    try {
        const order: Order = req.body;
        const newOrder = await OrderService.add(order);
        res.json(newOrder);
    } catch (error) {
        console.error('Error in add:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const result = await OrderService.deleteOrder({ id });
        res.json(result);
    } catch (error) {
        console.error('Error in deleteOrder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;
        const updatedOrder = await OrderService.update({ ...updateData });
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error in update:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.findAll();
        res.json(orders);
    } catch (error) {
        console.error('Error in findAll:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    add,
    deleteOrder,
    update,
    findAll
};

