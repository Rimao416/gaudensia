import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import categorySlice from "../slice/categorySlice";
import dishSlice from "../slice/dishSlice";
import testimonialSlice from "../slice/testimonialSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    dishes: dishSlice,
    testimonials: testimonialSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
