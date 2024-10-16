import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Form, message, TableColumnsType, Modal } from 'antd';
import axios from 'axios';

type ProductType = {
  id: number | null;
  code: string;
  name: string;
};

interface UploadOrderTabProps {
  onUpdateSuccess: () => void;
}

const ProductTypeTab: React.FC<UploadOrderTabProps> = ({ onUpdateSuccess }) => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [editingProductType, setEditingProductType] = useState<ProductType | null>(null);
  const [form] = Form.useForm();
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const types = await axios.post('http://localhost:5001/api/product-types/findAll');
      setProductTypes(types.data);
    } catch (error) {
      message.error('Failed to fetch product types');
    }
  };

  const addNewProductType = () => {
    const newProductType: ProductType = {
      id: null,
      code: '',
      name: '',
    };
    setProductTypes([newProductType, ...productTypes]);
    setEditingProductType(newProductType);
    form.setFieldsValue(newProductType);
  };

  const handleSaveButtonBlocked = () => {
    const currentValues = form.getFieldsValue();
    const allFieldsFilled = Object.values(currentValues).every(value => value !== '');
    setIsButtonEnabled(allFieldsFilled);
  };

  const isEditing = (record: ProductType) => record.id === editingProductType?.id;

  const handleEdit = (productType: ProductType) => {
    setEditingProductType(productType);
  };

  const handleSave = async (id: number) => {
    const productType = await form.validateFields();
    if (editingProductType) {
      try {
        await axios.post('http://localhost:5001/api/product-types/update', productType);
        setEditingProductType(null);
        fetchProductTypes();
        message.success('Product type updated successfully');
      } catch (error) {
        message.error('Failed to update product type');
      }
    }
  };

  const handleCancel = () => {
    setEditingProductType(null);
    form.resetFields();
    setProductTypes(productTypes.filter(productType => productType.id !== null));
  };

  const showDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const deleteProductType = async() => {
    if (deleteId) {
      await axios.post('http://localhost:5001/api/product-types/delete', { id: deleteId });
      setProductTypes(productTypes.filter(productType => productType.id !== deleteId));
    }
    setIsModalVisible(false);
  };

  const columns: TableColumnsType<ProductType> = [
    {
      title: '代號',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: ProductType) => {
        return isEditing(record) ? (
          <Form.Item
            name="code"
            style={{ margin: 0 }}
          >
            <Input />
          </Form.Item>
        ) : (
          text
        );
      }
    },
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ProductType) => {
        return isEditing(record) ? (
          <Form.Item
            name="name"
            style={{ margin: 0 }}
          >
            <Input />
          </Form.Item>
        ) : (
          text
        );
      }
    },
    {
      title: '操作',
      render: (_: any, record: ProductType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => handleSave(record.id !== null ? record.id : 0)} disabled={!isButtonEnabled}>保存</Button>
            <Button onClick={handleCancel}>取消</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => handleEdit(record)}>編輯</Button>
            <Button danger onClick={() => record.id !== null && showDeleteConfirm(record.id)}>刪除</Button>
          </span>
        );
      }
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={addNewProductType}>新增產品類型</Button>
      <Form form={form} component={false} onFieldsChange={handleSaveButtonBlocked}>
        <Table
          columns={columns}
          dataSource={productTypes}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Form>
      <Modal
        title="刪除產品類型"
        open={isModalVisible}
        onOk={deleteProductType}
        onCancel={() => setIsModalVisible(false)}
        okText="確認"
        cancelText=" 取消"
      >
        <p>確定要刪除這個產品類型嗎？若訂單還有該產品類型，則也會連帶刪除!!</p>
      </Modal>
    </div>
  );
};

export default ProductTypeTab;
