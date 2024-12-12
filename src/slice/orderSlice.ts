import { order } from "../interface/order";
import { API } from "../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API.defaults.baseURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      const language = localStorage.getItem("i18nextLng") || "fr";
      headers.set("lang", language);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<order[], void>({
      query: () => "/orders/me",
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
