import React, { createContext, useState, ReactNode } from 'react';

// Définir les types pour TypeScript (facultatif)
interface OverlayContextProps {
  isOverlayVisible: boolean;
  setOverlayVisible: (visible: boolean) => void;
}

// Initialiser le contexte avec une valeur par défaut
export const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

// Provider
export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  return (
    <OverlayContext.Provider value={{ isOverlayVisible, setOverlayVisible }}>
      {children}
    </OverlayContext.Provider>
  );
};

