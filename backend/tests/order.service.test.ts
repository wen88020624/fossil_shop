import orderService from '../src/services/order.service';
import orderModel from '../src/models/order.model';
import uploadService from '../src/services/upload.service';
import { Order } from '../src/entities/order';

jest.mock('../src/models/order.model', () => ({
    add: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    saveAllOrders: jest.fn(),
}));

describe('Order Service', () => {

    const mockOrderData1 = {
        id: 'af3a18b3-b703-4498-a451-cec5dc23b529',
        product_type: 'Am',
        product_name: '多維爾菊石',
        sale_price: 1000,
        buyer_name: 'Alice',
        income: 1060,
        receiver_name: '史庭鈞',
        sale_date: new Date('2023-09-13')
    };

    const mockOrderData2 = {
        id: 'bf3a18b3-b703-4498-a451-cec5dc23b530',
        product_type: 'Mn',
        product_name: '礦石',
        sale_price: 2000,
        buyer_name: 'Bob',
        income: 2120,
        receiver_name: '王小明',
        sale_date: new Date('2023-09-14')
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should add an order', async () => {
         (orderModel.add as jest.Mock).mockResolvedValue(mockOrderData1);

         const result = await orderService.add(mockOrderData1);

         expect(orderModel.add).toHaveBeenCalledWith(mockOrderData1);
         expect(result).toEqual(mockOrderData1);
    });

    test('should remove an order', async () => {
        (orderModel.remove as jest.Mock).mockResolvedValue(mockOrderData1);

        const result = await orderService.deleteOrder({ id: mockOrderData1.id });

        expect(orderModel.remove).toHaveBeenCalledWith(mockOrderData1.id);
        expect(result).toEqual(mockOrderData1);
    });

    test('should update an order', async () => {
        (orderModel.update as jest.Mock).mockResolvedValue(mockOrderData1);

        const result = await orderService.update({ ...mockOrderData1 });

        expect(orderModel.update).toHaveBeenCalledWith(mockOrderData1.id, mockOrderData1);
        expect(result).toEqual(mockOrderData1);
    });

    test('should find all orders', async () => {
        (orderModel.findAll as jest.Mock).mockResolvedValue([mockOrderData1]);

        const expectedData = [{
            ...mockOrderData1,
            sale_price: Math.round(mockOrderData1.sale_price),
            income: Math.round(mockOrderData1.income),
            sale_date: mockOrderData1.sale_date.toISOString().split('T')[0]
        }];

        const result = await orderService.findAll();

        expect(orderModel.findAll).toHaveBeenCalled();
        expect(result).toEqual(expectedData);
    });
    
    test('should save all orders', async () => {
        (orderModel.saveAllOrders as jest.Mock).mockResolvedValue([mockOrderData1, mockOrderData2]);

        const result = await uploadService.saveAllOrders([mockOrderData1, mockOrderData2] as Order[]);

        expect(orderModel.saveAllOrders).toHaveBeenCalledWith([mockOrderData1, mockOrderData2]);
        expect(result).toEqual([mockOrderData1, mockOrderData2]);
    });
});
