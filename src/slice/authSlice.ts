import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { user } from "../interface/user";
import {API} from "../config";
// Définition de l'API RTK Query
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API.defaults.baseURL, // L'URL de base
    credentials: "include", // Inclure les cookies
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
    refreshToken: builder.mutation<string, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      transformResponse: (response: { accessToken: string }) => response.accessToken,
    }),
  }),
});

// Export des hooks générés automatiquement
export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
} = authApi;

// Slice pour gérer les états locaux comme les erreurs
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as user | null,
    loading: false,
    errors: {} as { [key: string]: string | null },
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<user>>) => {
      state.user = { ...state.user, ...action.payload } as user;
    },
    setErrors: (state, action: PayloadAction<{ [key: string]: string | null }>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        Cookies.set("token", payload.token);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        Cookies.set("accessToken", payload.token);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
        if (payload) {
          console.log(payload.data)
          state.errors = payload.data as { [key: string]: string | null };
        }
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
     
  },
});

// Export des actions du slice
export const { setCredentials, setErrors } = authSlice.actions;

// Export du reducer pour la configuration du store
export default authSlice.reducer;
