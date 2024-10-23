import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, Form, Button, Row, Col, message } from 'antd';
import { useOrders } from '../hooks/useOrders';
import { getOrderColumns } from './OrderColumns';
import DeleteConfirmModal from './DeleteConfirmModal';
import { DEFAULT_PAGE_SIZE } from '../constants/orderConstants';
import * as api from '../services/api';
import { useProductTypes } from '../hooks/useProductTypes';
import { Order } from '../types/orderTypes';

interface OrderTabRef {
  refreshTable: () => void;
}

const OrderTab = forwardRef<OrderTabRef>((props, ref) => {
  const { orders, editingKey, isButtonEnabled, fetchOrders, addNewOrder, saveOrder, deleteOrder, setEditingKey, setOrders, setIsButtonEnabled } = useOrders();
  const { productTypes, fetchProductTypes } = useProductTypes();
  const [ form ] = Form.useForm();
  const [ isDeleteModalVisible, setIsDeleteModalVisible ] = React.useState(false);
  const [ deleteId, setDeleteId ] = React.useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchProductTypes();
  }, [fetchOrders, fetchProductTypes]);

  useImperativeHandle(ref, () => ({
    refreshTable: fetchOrders,
  }));

  const handleSaveButtonBlocked = () => {
    const currentValues = form.getFieldsValue();
    const allFieldsFilled = Object.values(currentValues).every(value => value !== '');
    setIsButtonEnabled(allFieldsFilled);
  };

  const handleDownload = async () => {
    try {
      const response = await api.downloadOrders();
      const url = window.URL.createObjectURL(new Blob(["\uFEFF" + response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error('Failed to download orders');
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    form.resetFields();
    setOrders(orders.filter(order => order.id !== null));
  };

  const showDeleteConfirm = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteOrder(deleteId);
    }
    setIsDeleteModalVisible(false);
  };

  const handleEdit = (record: Order) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
  };

  const columns = getOrderColumns(
    productTypes,
    isButtonEnabled,
    (record) => record.id === editingKey,
    (record) => handleEdit(record),
    (record) => saveOrder(record),
    handleCancel,
    showDeleteConfirm,
  );

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Button type="primary" onClick={addNewOrder}>新增訂單</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={handleDownload}>匯出所有訂單</Button>
        </Col>
      </Row>
      <Form form={form} component={false} onFieldsChange={handleSaveButtonBlocked}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        />
      </Form>
      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </div>
  );
});

export default OrderTab;
