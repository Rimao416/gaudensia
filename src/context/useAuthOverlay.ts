// src/hooks/useOverlay.ts
import { useContext } from "react";
import { AuthOverlayContext } from "./AuthOverlayContext";
// Hook pour utiliser le contexte
export const useAuthOverlay = () => {
  const context = useContext(AuthOverlayContext);
  if (!context) {
    throw new Error("useOverlay doit être utilisé dans un OverlayProvider");
  }
  return context;
};
