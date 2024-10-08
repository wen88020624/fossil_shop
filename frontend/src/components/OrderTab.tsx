import React, { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { Table, Form, Modal, TableColumnsType } from "antd";
import axios from "axios";
import Input from "antd/lib/input";

type Order = {
  id: string;
  product_type: string;
  product_name: string;
  sale_price: number;
  buyer_name: string;
  income: number;
  receiver_name: string;
  sale_date: Date;
};

interface OrderTabRef {
  refreshTable: () => void;
}

const OrderTab = forwardRef<OrderTabRef>((props, ref) => {
  const [orders, setDataSource] = useState<Order[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState< string | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 取得訂單
  useEffect(() => { getOrders() }, []);

  // 刷新訂單
  useImperativeHandle(ref, () => ({
    refreshTable: getOrders
  }));

  const getOrders = () => {
    axios.post('http://localhost:5001/api/findAll')
      .then(response => {
        setDataSource(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const addNewOrder = () => {
    const newOrder: Order = {
      id: "0",
      product_type: "Am",
      product_name: "菊石",
      sale_price: 0,
      buyer_name: "",
      income: 0,
      receiver_name: "史庭鈞",
      sale_date: new Date(),
    };
    setDataSource([newOrder, ...orders]);
    setEditingKey(newOrder.id);
    form.setFieldsValue(newOrder);
  };

  const handleSaveButtonBlocked = () => {
    const currentValues = form.getFieldsValue();
    const allFieldsFilled = Object.values(currentValues).every(value => value !== '');
    setIsButtonEnabled(allFieldsFilled);
  };

  const save = async (id: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...orders];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setDataSource(newData);
        setEditingKey(null);
        if (id === "0") {
          
          await axios.post('http://localhost:5001/api/add', updatedItem);
        } else {
          
          await axios.post('http://localhost:5001/api/update', updatedItem);
        }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const showDeleteConfirm = (id: string) => {
    setDeleteId(id);
    deleteOrder();
    setIsModalVisible(true);
  };

  const deleteOrder = async() => {
    if (deleteId) {
      await axios.post('http://localhost:5001/api/delete', { id: deleteId });
      setDataSource(orders.filter(order => order.id !== deleteId));
    }
    setIsModalVisible(false);
    
  };

  const modalCancel = () => {
    setIsModalVisible(false);
  };

  const editCancel = () => {
    setEditingKey(null);
  };

  const columns: TableColumnsType<Order> = [
    {
      title: '類型',
      dataIndex: 'product_type',
      key: 'product_type',
      sorter: (a: Order, b: Order) => a.product_type.localeCompare(b.product_type),
      filters: Array.from(new Set(orders.map(item => item.product_type))).map(type => ({
        text: type,
        value: type,
      })),
      onFilter: (value: string, record: Order) => record.product_type.includes(value as string),
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="product_type"
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
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a: Order, b: Order) => a.product_name.localeCompare(b.product_name),
      filters: Array.from(new Set(orders.map(item => item.product_name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value: string, record: Order) => record.product_name.includes(value as string),
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="product_name"
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
      title: '成交價',
      dataIndex: 'sale_price',
      key: 'sale_price',
      sorter: (a: Order, b: Order) => a.sale_price - b.sale_price,
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="sale_price"
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
      title: '買家名稱',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
      sorter: (a: Order, b: Order) => a.buyer_name.localeCompare(b.buyer_name),
      filters: Array.from(new Set(orders.map(item => item.buyer_name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value: string, record: Order) => record.buyer_name.includes(value as string),
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="buyer_name"
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
      title: '實收金額',
      dataIndex: 'income',
      key: 'income',
      sorter: (a: Order, b: Order) => a.income - b.income,
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="income"
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
      title: '收款人',
      dataIndex: 'receiver_name',
      key: 'receiver_name',
      sorter: (a: Order, b: Order) => a.receiver_name.localeCompare(b.receiver_name),
      filters: Array.from(new Set(orders.map(item => item.receiver_name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value: string, record: Order) => record.receiver_name.includes(value as string),
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="receiver_name"
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
      title: '賣出日期',
      dataIndex: 'sale_date',
      key: 'sale_date',
      sorter: (a: Order, b: Order) => new Date(a.sale_date).getTime() - new Date(b.sale_date).getTime(),
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="sale_date"
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
      render: (_: any, record: Order) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <button onClick={() => save(record.id)} disabled={!isButtonEnabled}>保存</button>
            <button onClick={editCancel}>取消</button>
          </span>
        ) : (
          <span>
            <button onClick={() => edit(record)}>編輯</button>
            <button onClick={() => showDeleteConfirm(record.id)}>刪除</button>
          </span>
        );
      }
    }
  ] as TableColumnsType<Order>;

  const isEditing = (record: Order) => record.id === editingKey;

  const edit = (record: Order) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  return (
    <div>
      <button onClick={addNewOrder}>新增訂單</button>
      <Form form={form} component={false} onFieldsChange={handleSaveButtonBlocked}>
        <Table 
          columns={columns}
          dataSource={orders} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Form>
      <Modal
        title="刪除訂單"
        open={isModalVisible}
        onOk={deleteOrder}
        onCancel={() => setIsModalVisible(false)}
        okText="確認"
        cancelText="取消"
      >
        <p>確定要刪除這筆訂單嗎？</p>
      </Modal>
    </div>

    
  );
});

export default OrderTab;
