import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"), // Charge les données
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        console.log("Mise à jour de l'article :", item);
        item.quantity += action.payload.quantity;
        // Recalcule le prix total
        item.price = action.payload.price * item.quantity;
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
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
