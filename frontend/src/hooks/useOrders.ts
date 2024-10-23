import { useState, useCallback } from 'react';
import { message } from 'antd';
import { Order } from '../types/orderTypes';
import * as api from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.fetchOrders();
      setOrders(response.data);
    } catch (error) {
      message.error('Failed to fetch orders');
    }
  }, []);

  const addNewOrder = useCallback(() => {
    const newOrder: Order = {
      id: null,
      product_type_id: 1,
      product_name: "菊石",
      sale_price: 0,
      buyer_name: "",
      income: 0,
      receiver_name: "史庭鈞",
      sale_date: new Date(),
    };
    setOrders([newOrder, ...orders]);
    setEditingKey(newOrder.id);
  }, [orders]);

  const saveOrder = useCallback(async (order: Order) => {
    try {
      if (order.id === null) {
        await api.addOrder(order);
      } else {
        await api.updateOrder(order);
      }
      await fetchOrders();
      setEditingKey(null);
      message.success('Order saved successfully');
    } catch (error) {
      message.error('Failed to save order');
    }
  }, [fetchOrders]);

  const deleteOrder = useCallback(async (id: string) => {
    try {
      await api.deleteOrder(id);
      await fetchOrders();
      message.success('Order deleted successfully');
    } catch (error) {
      message.error('Failed to delete order');
    }
  }, [fetchOrders]);

  return {
    orders,
    editingKey,
    isButtonEnabled,
    fetchOrders,
    addNewOrder,
    saveOrder,
    deleteOrder,
    setEditingKey,
    setOrders,
    setIsButtonEnabled,
  };
};
