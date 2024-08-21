export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
}

export type UserAddressType = {
  id: string;
  address_line_1: string;
  address_line_2: string;
  street_name: string;
  city: string;
  postal_code: string;
  country: string;
};

export type UserOrder = {
  id: string;
  products: string[];
  payment_status: PAYMENT_STATUS;
  payment_price: number;
  payment_id: string;
  order_time: Date;
  updatedAt: Date;
  user_id: string;
};
