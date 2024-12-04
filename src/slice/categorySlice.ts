import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { category } from "../interface/category";
import { API } from "../config";

// Define the API slice for categories
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API.defaults.baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<category[], void>({
      query: () => "/categories",
    }),
  }),
});

// Export the auto-generated hook for querying categories
export const { useGetCategoriesQuery } = categoryApi;
