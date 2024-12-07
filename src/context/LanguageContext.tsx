import React from "react";

interface LanguageContextProps {
  language: string | null;
  setLanguage: (language: "fr" | "en" | "pl") => void;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  language: localStorage.getItem("i18nextLng") ? localStorage.getItem("lang") : "fr", 
  setLanguage: () => {},
});

// Provider
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = React.useState<"fr" | "en" | "pl">(
    localStorage.getItem("i18nextLng") ? (localStorage.getItem("i18nextLng") as "fr" | "en" | "pl") : "fr"
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
