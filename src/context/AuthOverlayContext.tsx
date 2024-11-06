import React, { createContext, useReducer, ReactNode } from "react";

// Définir les types pour TypeScript (facultatif)
interface AuthOverlayContextProps {
  isAuthOverlayVisible: boolean;
  type: "login" | "sign";
  setAuthOverlayVisible: (visible: boolean) => void;
  setType: (type: "login" | "sign") => void;
}

type Action =
  | { type: "TOGGLE_VISIBILITY"; payload: boolean }
  | { type: "SET_TYPE"; payload: "login" | "sign" };

// Initialiser l'état par défaut
const initialState: AuthOverlayContextProps = {
  isAuthOverlayVisible: true,
  type: "login", // Par défaut, on commence sur "login"
  setAuthOverlayVisible: () => {}, // Fournir une fonction vide par défaut
  setType: () => {} // Fournir une fonction vide par défaut
};

// Reducer pour gérer les actions
const authOverlayReducer = (state: AuthOverlayContextProps, action: Action): AuthOverlayContextProps => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { ...state, isAuthOverlayVisible: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

// Initialiser le contexte avec la valeur par défaut
export const AuthOverlayContext = createContext<AuthOverlayContextProps | undefined>(undefined);

// Provider avec useReducer
export const AuthOverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authOverlayReducer, initialState);

  // Fonction pour mettre à jour la visibilité
  const setAuthOverlayVisible = (visible: boolean) => {
    dispatch({ type: "TOGGLE_VISIBILITY", payload: visible });
  };

  // Fonction pour mettre à jour le type
  const setType = (type: "login" | "sign") => {
    dispatch({ type: "SET_TYPE", payload: type });
  };

  return (
    <AuthOverlayContext.Provider value={{ ...state, setAuthOverlayVisible, setType }}>
      {children}
    </AuthOverlayContext.Provider>
  );
};
