import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderTab from '../OrderTab';
import { useOrders } from '../../hooks/useOrders';
import * as api from '../../services/api';

jest.mock('../../hooks/useOrders');
jest.mock('../../services/api');

describe('OrderTab', () => {
  const mockFetchOrders = jest.fn();
  const mockAddNewOrder = jest.fn();
  const mockSaveOrder = jest.fn();
  const mockDeleteOrder = jest.fn();

  beforeEach(() => {
    (useOrders as jest.Mock).mockReturnValue({
      orders: [],
      editingKey: null,
      fetchOrders: mockFetchOrders,
      addNewOrder: mockAddNewOrder,
      saveOrder: mockSaveOrder,
      deleteOrder: mockDeleteOrder,
      setEditingKey: jest.fn(),
    });

    (api.downloadOrders as jest.Mock).mockResolvedValue({ data: 'csv data' });
  });

  it('renders without crashing', () => {
    render(<OrderTab />);
    expect(screen.getByText('新增訂單')).toBeInTheDocument();
    expect(screen.getByText('匯出所有訂單')).toBeInTheDocument();
  });

  it('calls fetchOrders on mount', () => {
    render(<OrderTab />);
    expect(mockFetchOrders).toHaveBeenCalledTimes(1);
  });

  it('calls addNewOrder when "新增訂單" button is clicked', () => {
    render(<OrderTab />);
    fireEvent.click(screen.getByText('新增訂單'));
    expect(mockAddNewOrder).toHaveBeenCalledTimes(1);
  });

  it('calls downloadOrders when "匯出所有訂單" button is clicked', async () => {
    render(<OrderTab />);
    fireEvent.click(screen.getByText('匯出所有訂單'));
    await waitFor(() => {
      expect(api.downloadOrders).toHaveBeenCalledTimes(1);
    });
  });

  // Add more tests for other functionalities like editing, saving, and deleting orders
});
