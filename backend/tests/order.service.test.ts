import orderService from '../src/services/order.service';
import orderModel from '../src/models/order.model';

jest.mock('../src/models/order.model', () => ({
    add: jest.fn(),
}));

describe('Order Service', () => {

    const mockOrderData = {
        id: 'af3a18b3-b703-4498-a451-cec5dc23b529',
        product_type: 'Am',
        product_name: '多維爾菊石',
        sale_price: 1000,
        buyer_name: 'Alice',
        income: 1060,
        receiver_name: '史庭鈞',
        sale_date: new Date('2023-09-13')
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should add an order', async () => {
         (orderModel.add as jest.Mock).mockResolvedValue(mockOrderData);

         const result = await orderService.add(mockOrderData);

         expect(orderModel.add).toHaveBeenCalledWith(mockOrderData);
         expect(result).toEqual(mockOrderData);
    });
});
