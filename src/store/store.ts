import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  { categoryApi } from "../slice/categorySlice";
import  { dishesApi } from "../slice/dishSlice";
import { authApi } from "../slice/authSlice";
import authReducer from "../slice/authSlice"
import cartSlice from "../slice/cartSlice";
import saveCartToLocalStorage from "./listener";
import { testimonialApi } from "../slice/testimonialSlice";
import { cartApi } from "../slice/cartApi";
import { orderApi } from "../slice/orderSlice";
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [dishesApi.reducerPath]:dishesApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    auth: authReducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    cart: cartSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(authApi.middleware)
    .concat(dishesApi.middleware) // Ajoute le middleware RTK Query ici
    .concat(categoryApi.middleware)
    .concat(testimonialApi.middleware)
    .concat(cartApi.middleware)
    .concat(orderApi.middleware)
    .concat(saveCartToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
