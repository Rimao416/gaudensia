import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {API} from "../config";
import Cookies from "js-cookie";
import axios from "axios";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  deliveryAddress: string;
  deliveryDetails: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  errors: {
    [key: string]: string | null;
  } | null;
  allergies: string;
  totalPrice: number;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"), // Charge les données
  status: "idle",
  errors: {
    deliveryAddress: "",
    deliveryDetails: "",
  },
  allergies: "",
  totalPrice: 0,
  deliveryAddress: "",
  deliveryDetails: "",
};

// Créez un thunk pour l'ajout d'un article au panier en base de données
export const addItemToCartDb = createAsyncThunk(
  "cart/addItemToCartDb",
  async (cart: Partial<CartState>, { rejectWithValue }) => {
    // Utilisation de Partial<CartState>
    try {
      const token = Cookies.get("accessToken");
      API.defaults.withCredentials = true;
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/cart", cart);
      return response.data; // Si tout va bien, renvoyer la réponse
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("Erreur inconnue");
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        console.log("Mise à jour de l'article :", item);
        item.quantity = action.payload.quantity;
        item.price = action.payload.price * item.quantity; // Recalculer le prix
      } else {
        console.log("Ajout d'un nouvel article :", action.payload);
        state.items.push({
          ...action.payload,
          price: action.payload.price * action.payload.quantity, // Calcul du prix total
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
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
    setErrors: (
      state,
      action: PayloadAction<{ [key: string]: string | null }>
    ) => {
      state.errors = action.payload;
    },
    setAllergies: (state, action: PayloadAction<string>) => {
      state.allergies = action.payload; // Met à jour la chaîne des allergies globales
    },
    setLocation: (
      state,
      action: PayloadAction<{
        deliveryAddress: string;
        deliveryDetails: string;
      }>
    ) => {
      console.log(action.payload);
      state.deliveryAddress = action.payload.deliveryAddress;
      state.deliveryDetails = action.payload.deliveryDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCartDb.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalPrice = 0;
      })
      .addCase(addItemToCartDb.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.payload); // Traitez ici l'erreur reçue
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  incrementItemQuantity,
  decrementItemQuantity,
  setErrors,
  setAllergies,
  setLocation,
} = cartSlice.actions;

export default cartSlice.reducer;
