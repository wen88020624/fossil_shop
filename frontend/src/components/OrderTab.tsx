import { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import { Table, Form, Modal, TableColumnsType, Button, Row, Col, message, Select } from "antd";
import axios from "axios";
import Input from "antd/lib/input";

type Order = {
  id: string | null;
  product_type_id: number;
  product_name: string;
  sale_price: number;
  buyer_name: string;
  income: number;
  receiver_name: string;
  sale_date: Date;
};

type ProductType = {
  id: string;
  code: string;
  name: string;
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
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  // 取得訂單
  useEffect(() => { getOrders() }, []);
  useEffect(() => { getProductTypes() }, []);
  // 刷新訂單
  useImperativeHandle(ref, () => ({
    refreshTable: getOrders,
    refreshProductTypes: getProductTypes
  }));

  const getOrders = () => {
    axios.post('http://localhost:5001/api/orders/findAll')
      .then(response => {
        setDataSource(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const getProductTypes = () => {
    axios.post('http://localhost:5001/api/product-types/findAll')
      .then(response => {
        setProductTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const addNewOrder = () => {
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
    setDataSource([newOrder, ...orders]);
    setEditingKey(newOrder.id);
    form.setFieldsValue(newOrder);
  };

  const handleSaveButtonBlocked = () => {
    const currentValues = form.getFieldsValue();
    const allFieldsFilled = Object.values(currentValues).every(value => value !== '');
    setIsButtonEnabled(allFieldsFilled);
  };

  const save = async () => {
    try {
      const order = await form.validateFields();
      if (editingKey === null) {
        try {
          await axios.post('http://localhost:5001/api/orders/add', order);
          getOrders();
          message.success('Order added successfully');
        } catch (error) {
          message.error('Failed to add order');
        }
      } else {
        try {
          await axios.post('http://localhost:5001/api/orders/update', { id: editingKey, ...order });
          setEditingKey(null);
          getOrders();
          message.success('Order updated successfully');
        } catch (error) {
          message.error('Failed to update order');
        }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    form.resetFields();
    setDataSource(orders.filter(order => order.id !== null));
  };

  const showDeleteConfirm = (id: string | null) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const deleteOrder = async(id: string | null) => {
    if (id) {
      await axios.post('http://localhost:5001/api/orders/delete', { id: id });
      setDataSource(orders.filter(order => order.id !== id));
    }
    setIsModalVisible(false);
  };

  const downloadAllOrders = async () => {
    await axios.post('http://localhost:5001/api/orders/downloadAllOrders', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob(["\uFEFF"+response.data], { type: 'text/csv;charset=utf-8;' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'orders.csv'); // 設置下載文件的名稱
        document.body.appendChild(link); // 將鏈接添加到 DOM
        link.click(); // 模擬點擊事件
        document.body.removeChild(link); // 點擊後移除鏈接
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
      });
};

  const columns: TableColumnsType<Order> = [
    {
      title: '類型',
      dataIndex: 'product_type',
      key: 'product_type',
      sorter: (a: Order, b: Order) => a.product_type_id - b.product_type_id,
      filters: productTypes.map(type => ({
        text: type.name,
        value: type.id.toString(),
      })),
      onFilter: (value: string, record: Order) => record.product_type_id.toString() === value,
      render: (text: string, record: Order) => {
        return isEditing(record) ? (
          <Form.Item
            name="product_type_id"
            style={{ margin: 0 }}
            rules={[{ required: true, message: '請選擇產品類型' }]}
          >
            <Select>
              {productTypes.map(type => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
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
            <Button onClick={() => save()} disabled={!isButtonEnabled}>保存</Button>
            <Button onClick={handleCancel}>取消</Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)}>編輯</Button>
            <Button danger onClick={() => showDeleteConfirm(record.id)}>刪除</Button>
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
      <Row justify="space-between">
        <Col>
          <Button type="primary" onClick={addNewOrder}>新增訂單</Button>
        </Col>
        <Col>
          <Button type="primary" onClick={downloadAllOrders}>匯出所有訂單</Button>
        </Col>
      </Row>
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
        onOk={() => deleteOrder(deleteId)}
        onCancel={() => setIsModalVisible(false)}
        okText="確認"
        cancelText=" 取消"
      >
        <p>確定要刪除這筆訂單嗎？</p>
      </Modal>
    </div>

    
  );
});

export default OrderTab;
