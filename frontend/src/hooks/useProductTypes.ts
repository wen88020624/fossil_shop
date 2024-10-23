import { useState, useCallback } from 'react';
import { message } from 'antd';
import { ProductType } from '../types/orderTypes';
import * as api from '../services/api';

export const useProductTypes = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const fetchProductTypes = useCallback(async () => {
    try {
      const response = await api.fetchProductTypes();
      setProductTypes(response.data);
    } catch (error) {
      message.error('Failed to fetch product types');
    }
  }, []);

  return { productTypes, fetchProductTypes };
};
