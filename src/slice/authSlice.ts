import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { user } from "../interface/user";
import { API } from "../config";

// Configuration de base pour l'API
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API.defaults.baseURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<user, Partial<user>>({
      query: (newUser) => ({
        url: "/auth/sign",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation<user, Partial<user>>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<user, void>({
      query: () => "/user",
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
} = authApi;
