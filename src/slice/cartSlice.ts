import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  deliveryAddress: string;
  deliveryDetails: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  errors: { [key: string]: string | null } | null;
  allergies: string;
  totalPrice: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  deliveryAddress: "",
  deliveryDetails: "",
  status: "idle",
  errors: null,
  allergies: "",
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
        item.price =
          (item.price / (item.quantity - action.payload.quantity)) *
          item.quantity;
      } else {
        state.items.push({
          ...action.payload,
          price: action.payload.price * action.payload.quantity,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.price = (item.price / (item.quantity - 1)) * item.quantity; // Mettre à jour le prix total
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.price = (item.price / (item.quantity + 1)) * item.quantity; // Mettre à jour le prix total
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    setErrors: (
      state,
      action: PayloadAction<{ [key: string]: string | null }>
    ) => {
      state.errors = action.payload;
    },
    setAllergies: (state, action: PayloadAction<string>) => {
      state.allergies = action.payload;
    },
    setLocation: (
      state,
      action: PayloadAction<{
        deliveryAddress: string;
        deliveryDetails: string;
      }>
    ) => {
      console.log(action)
      state.deliveryAddress = action.payload.deliveryAddress;
      state.deliveryDetails = action.payload.deliveryDetails;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.addItemToCart.matchFulfilled,
      (state) => {
        state.items = [];
        state.totalPrice = 0; // On efface le panier
      }
    );
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setErrors,
  setAllergies,
  setLocation,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
