interface items {
  id: string;
  price: number;
  _id: string;
  name:string;
  description?:string;
}
export interface order {
  _id: string;
  items: items[];
  deliveryAddress: string;
  deliveryDetails: string;
  allergies: string;
  totalPrice: number;
  createdAt: string;
}
