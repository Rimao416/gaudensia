import { Middleware } from "@reduxjs/toolkit";

const saveCartToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items)); // Sauvegarde le panier
  return result;
};

export default saveCartToLocalStorage;
