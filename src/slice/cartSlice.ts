import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../config";
import Cookies from "js-cookie";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  errors: {
    [key: string]: string | null;
  } | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"), // Charge les données
  status: "idle",
  errors: {
    deliveryAddress: "",
    deliveryDetails: "",
  },
};

// Créez un thunk pour l'ajout d'un article au panier en base de données
export const addItemToCartDb = createAsyncThunk(
  "cart/addItemToCartDb",
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      API.defaults.withCredentials = true;
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.post("/cart", item);
      return response.data; // Si tout va bien, renvoyer la réponse
    } catch (error) {
      return rejectWithValue(error); // Retourner l'erreur si elle se produit
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
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
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
    },
    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.price = (item.price / (item.quantity + 1)) * item.quantity; // Mettre à jour le prix total
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    setErrors: (
      state,
      action: PayloadAction<{ [key: string]: string | null }>
    ) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartDb.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCartDb.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload); // Traitez ici la réponse reçue
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
} = cartSlice.actions;

export default cartSlice.reducer;
