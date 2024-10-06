// import 'jest';
// import 'expect-more-jest';
// import OrderService from '../services/order.service';
// import { Order } from '../entities/order';

// jest.mock('../models/order.model');

// describe('Order Service', () => {
// 	let testOrder: Order;
// 	const orderKeys = ['id', 'product_type', 'product_name', 'sale_price', 'buyer_name', 'income', 'receiver_name', 'sale_date'];

// 	describe('add', () => {
// 		it('should have an add order function', () => {
// 			expect(typeof OrderService.add).toBe('function');
// 		});

// 		it('should return order json when adding an order', async () => {
// 			const orderData = {
// 				id: 'uuid',
// 				product_type: 'Test Product Type',
// 				product_name: 'Test Product',
// 				sale_price: 100,
// 				buyer_name: 'Test Buyer',
// 				income: 80,
// 				receiver_name: 'Test Receiver',
// 				sale_date: new Date()
// 			};

// 			testOrder = await OrderService.add(orderData);

// 			expect(Object.keys(testOrder)).toEqual(expect.arrayContaining(orderKeys));
// 			expect(typeof testOrder.id).toBe('string');
// 			expect(testOrder.product_type).toBe(orderData.product_type);
// 			expect(testOrder.product_name).toBe(orderData.product_name);
// 			expect(testOrder.sale_price).toBe(orderData.sale_price);
// 			expect(testOrder.buyer_name).toBe(orderData.buyer_name);
// 			expect(testOrder.income).toBe(orderData.income);
// 			expect(testOrder.receiver_name).toBe(orderData.receiver_name);
// 			expect(testOrder.sale_date).toEqual(orderData.sale_date);
// 		});
// 	});

// 	describe('findAll', () => {
// 		it('should return an array of orders', async () => {
// 			const orders = await OrderService.findAll();
// 			expect(Array.isArray(orders)).toBe(true);
// 			if (orders.length > 0) {
// 				expect(Object.keys(orders[0])).toEqual(expect.arrayContaining(orderKeys));
// 			}
// 		});
// 	});

// 	describe('update', () => {
// 		it('should update an order and return the updated order', async () => {
// 			const updateData = {
// 				id: testOrder.id,
// 				product_name: 'Updated Product',
// 				sale_price: 150
// 			};

// 			const updatedOrder = await OrderService.update(updateData);

// 			expect(updatedOrder.order_id).toBe(testOrder.order_id);
// 			expect(updatedOrder.product_name).toBe(updateData.product_name);
// 			expect(updatedOrder.sale_price).toBe(updateData.sale_price);
// 		});
// 	});

// 	describe('deleteOrder', () => {
// 		it('should delete an order and return a success message', async () => {
// 			const result = await OrderService.deleteOrder({ order_id: testOrder.order_id });
// 			expect(result).toEqual({ message: 'Order deleted successfully' });
// 		});
// 	});
// });