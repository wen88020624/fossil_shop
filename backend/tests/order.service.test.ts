import orderService from '../src/services/order.service';
import orderModel from '../src/models/order.model';
import productTypeModel from '../src/models/product_type.model';
import { Order } from '../src/entities/order';

jest.mock('../src/models/order.model');
jest.mock('../src/models/product_type.model');

describe('Order Service', () => {
    const mockOrder = {
        id: 'af3a18b3-b703-4498-a451-cec5dc23b529',
        product_type_id: 1,
        product_name: '多維爾菊石',
        sale_price: 1000,
        buyer_name: 'Alice',
        income: 1060,
        receiver_name: '史庭鈞',
        sale_date: new Date('2023-09-13')
    } as Order;

    const mockProductType = {
        id: 1,
        name: 'Am',
        code: 'AM001'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add an order', async () => {
            (orderModel.add as jest.Mock).mockResolvedValue(mockOrder);

            const result = await orderService.add(mockOrder);

            expect(orderModel.add).toHaveBeenCalledWith(mockOrder);
            expect(result).toEqual(mockOrder);
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order', async () => {
            (orderModel.remove as jest.Mock).mockResolvedValue(mockOrder);

            const result = await orderService.deleteOrder({ id: mockOrder.id });

            expect(orderModel.remove).toHaveBeenCalledWith(mockOrder.id);
            expect(result).toEqual(mockOrder);
        });
    });

    describe('update', () => {
        it('should update an order', async () => {
            (orderModel.update as jest.Mock).mockResolvedValue(mockOrder);

            const result = await orderService.update(mockOrder);

            expect(orderModel.update).toHaveBeenCalledWith(mockOrder.id, mockOrder);
            expect(result).toEqual(mockOrder);
        });
    });

    describe('findAll', () => {
        it('should return all orders with product type names', async () => {
            const mockOrders = [mockOrder];
            const mockProductTypes = [mockProductType];

            (orderModel.findAll as jest.Mock).mockResolvedValue(mockOrders);
            (productTypeModel.findAll as jest.Mock).mockResolvedValue(mockProductTypes);

            const expectedResult = [{
                ...mockOrder,
                sale_price: Math.round(mockOrder.sale_price),
                income: Math.round(mockOrder.income),
                sale_date: mockOrder.sale_date.toISOString().split('T')[0],
                product_type: mockProductType.name
            }];

            const result = await orderService.findAll();

            expect(orderModel.findAll).toHaveBeenCalled();
            expect(productTypeModel.findAll).toHaveBeenCalled();
            expect(result).toEqual(expectedResult);
        });

        it('should handle orders with unknown product types', async () => {
            const orderWithUnknownProductType = {
                ...mockOrder,
                product_type_id: 999 // 不存在的產品類型ID
            } as Order;

            (orderModel.findAll as jest.Mock).mockResolvedValue([orderWithUnknownProductType]);
            (productTypeModel.findAll as jest.Mock).mockResolvedValue([mockProductType]);

            const expectedResult = [{
                ...orderWithUnknownProductType,
                sale_price: Math.round(orderWithUnknownProductType.sale_price),
                income: Math.round(orderWithUnknownProductType.income),
                sale_date: orderWithUnknownProductType.sale_date.toISOString().split('T')[0],
                product_type: undefined
            }];

            const result = await orderService.findAll();

            expect(result).toEqual(expectedResult);
        });
    });
});
