import React, { useEffect, useState } from "react";
import { useMessages } from "../context/useMessage";

const MessageDisplay: React.FC = () => {
  const { message, type, setMessage } = useMessages();
  const [isVisible, setIsVisible] = useState(false); // Gestion de la visibilité du message
  console.log("Je suis appelé");

  useEffect(() => {
    console.log("Je suis l'appel du useEffect");

    if (message) {
      setIsVisible(true); // Affiche le message

      const timeoutId = setTimeout(() => {
        setIsVisible(false); // Cache le message après 5 secondes
        setMessage(null, type); // Retirer le message
      }, 5000);

      return () => clearTimeout(timeoutId);
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
