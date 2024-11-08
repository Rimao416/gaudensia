import { useState, useEffect } from "react";

// Hook qui renvoie un booléen en fonction de la taille de l'écran
export const useResize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Si la largeur de la fenêtre est inférieure à 768px, c'est un mobile
    };

    // Appeler la fonction à chaque redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);

    // Initialiser la valeur lors du premier montage
    handleResize();

    // Nettoyage de l'événement lors de la suppression du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
