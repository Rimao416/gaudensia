import React, { useEffect, useState } from "react";
import { useMessages } from "../context/useMessage";

const MessageDisplay: React.FC = () => {
  const { message, type, setMessage } = useMessages();
  const [isVisible, setIsVisible] = useState(false); // Gestion de la visibilité du message

  useEffect(() => {
    if (message) {
      setIsVisible(true); // Affiche le message

      const timeoutId = setTimeout(() => {
        setIsVisible(false); // Cache le message avec un délai avant de l'enlever
      }, 4500); // Attendre que l'animation soit terminée avant de cacher le message

      const removeMessageTimeoutId = setTimeout(() => {
        setMessage(null, type); // Retirer le message après la transition
      }, 5000); // Retirer après 5 secondes pour garantir que l'animation soit complète

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(removeMessageTimeoutId);
      };
    }
  }, [message, setMessage, type]);

  // Styles basés sur le type du message
  const messageStyles = {
    success: { backgroundColor: "green", color: "white" },
    error: { backgroundColor: "red", color: "white" },
    info: { backgroundColor: "blue", color: "white" },
    warning: { backgroundColor: "orange", color: "white" },
  };

  return (
    <div>
      {message && (
        <div
          className={`notifications ${isVisible ? "show" : ""}`} 
          style={type ? messageStyles[type] : {}}
        >
          <p className="notifications__message">{message}</p>
        </div>
      )}
    </div>
  );
};

export default MessageDisplay;
