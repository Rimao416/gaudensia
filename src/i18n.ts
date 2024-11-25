import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Import des traductions si tu ne veux pas utiliser de fichiers séparés


i18n
  .use(HttpBackend) // Facultatif, pour charger les traductions depuis des fichiers
  .use(LanguageDetector) // Détecte automatiquement la langue
  .use(initReactI18next) // Liaison avec React
  .init({
    backend:{
        loadPath:"/locales/{{lng}}/translation.json"
    },
    fallbackLng: "fr", // Langue par défaut
    interpolation: {
      escapeValue: false, // React gère déjà l'échappement des valeurs
    },
  });

export default i18n;
