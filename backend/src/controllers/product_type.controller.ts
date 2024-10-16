import { Request, Response } from 'express';
import productTypeService from '../services/product_type.service';

export async function add(req: Request, res: Response) {
    const productType = req.body;
    try {
        const newProductType = await productTypeService.add(productType);
        res.status(201).json(newProductType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await productTypeService.removeProductType(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const productType = req.body;
    try {
        const updatedProductType = await productTypeService.update(Number(id), productType);
        res.status(200).json(updatedProductType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function findAll(req: Request, res: Response) {
    try {
        const productTypes = await productTypeService.findAll();
        res.status(200).json(productTypes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    add,
    remove,
    update,
    findAll
}