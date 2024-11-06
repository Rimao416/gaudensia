import React, { createContext, useState, ReactNode } from "react";

// Définir les types pour TypeScript (facultatif)
interface AuthOverlayContextProps {
  isAuthOverlayVisible: boolean;
  setAuthOverlayVisible: (visible: boolean) => void;
  type: "login" | "sign";
  setType: (type: "login" | "sign") => void;
}

// Initialiser le contexte avec une valeur par défaut
export const AuthOverlayContext = createContext<
  AuthOverlayContextProps | undefined
>(undefined);

// Provider
export const AuthOverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthOverlayVisible, setAuthOverlayVisible] = useState(true);
  const [type, setType] = useState<"login" | "sign">("login");

  return (
    <AuthOverlayContext.Provider
      value={{ isAuthOverlayVisible, setAuthOverlayVisible, type, setType }}
    >
      {children}
    </AuthOverlayContext.Provider>
  );
};
