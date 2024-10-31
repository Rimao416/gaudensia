import { category } from "./category";

export interface dishes {
  _id: string;
  name: string;
  description?: string;
  prices: {
    quantity: string; // Ex: "1/2", "entier", "500g"
    price: number; // Prix en PLN
  }[];
  category: category;
}
