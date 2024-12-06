import React from "react";
interface LanguageContextProps {
  language: string;
  setLanguage: (language: "fr" | "en" | "pl") => void;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  language: localStorage.getItem("lang") || "fr",
  setLanguage: () => {},
});

// Provider
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = React.useState<"fr" | "en" | "pl">("fr");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
