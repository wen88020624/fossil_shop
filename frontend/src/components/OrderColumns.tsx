import { TableColumnsType, Button, Form, Input, Select } from 'antd';
import { Order, ProductType } from '../types/orderTypes';

export const getOrderColumns = (
  productTypes: ProductType[],
  isButtonEnabled: boolean,
  isEditing: (record: Order) => boolean,
  handleEdit: (record: Order) => void,
  save: (record: Order) => void,
  handleCancel: () => void,
  showDeleteConfirm: (id: string) => void
): TableColumnsType<Order> => {
  return [
    {
        title: '類型',
        dataIndex: 'product_type',
        key: 'product_type',
        sorter: (a: Order, b: Order) => a.product_type_id - b.product_type_id,
        filters: productTypes.map(type => ({
          text: type.name,
          value: type.id.toString(),
        })),
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
              <Button onClick={() => save(record)} disabled={!isButtonEnabled}>保存</Button>
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
};
