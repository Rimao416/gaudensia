import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API } from "../config";
import { CartState } from "./cartSlice";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddCartResponse {
  message: string;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API.defaults.baseURL, // Remplacez par votre URL
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addItemToCart: builder.mutation<AddCartResponse, Partial<CartState>>({

      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
    }),
    // Ajoutez d'autres endpoints si nécessaire (fetchCart, removeItem, etc.)
  }),
});

export const { useAddItemToCartMutation } = cartApi;
