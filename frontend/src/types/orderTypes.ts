export type Order = {
  id: string | null;
  product_type_id: number;
  product_name: string;
  sale_price: number;
  buyer_name: string;
  income: number;
  receiver_name: string;
  sale_date: Date;
};

export type ProductType = {
  id: string;
  code: string;
  name: string;
};
