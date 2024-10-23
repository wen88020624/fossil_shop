import axios from 'axios';
import { Order, ProductType } from '../types/orderTypes';

const API_BASE_URL = 'http://localhost:5001/api';

export const fetchOrders = () => axios.post<Order[]>(`${API_BASE_URL}/orders/findAll`);
export const fetchProductTypes = () => axios.post<ProductType[]>(`${API_BASE_URL}/product-types/findAll`);
export const addOrder = (order: Order) => axios.post(`${API_BASE_URL}/orders/add`, order);
export const updateOrder = (order: Order) => axios.post(`${API_BASE_URL}/orders/update`, order);
export const deleteOrder = (id: string) => axios.post(`${API_BASE_URL}/orders/delete`, { id });
export const downloadOrders = () => axios.post(`${API_BASE_URL}/orders/downloadAllOrders`, { responseType: 'blob' });
