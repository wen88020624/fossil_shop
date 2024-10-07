import { Request, Response } from 'express';
import { uploadService } from '../services/upload.service';

export const uploadOrder = async (req: Request, res: Response) => {
    try {
        const csvData = req.body;
        const result = await uploadService.uploadCSV(csvData);
        res.json(result);
    } catch (error) {
        console.error('Error in uploadCSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    uploadOrder
};
