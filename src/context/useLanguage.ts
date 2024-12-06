import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error('useOverlay doit être utilisé dans un OverlayProvider');
    }
    return context;
  };