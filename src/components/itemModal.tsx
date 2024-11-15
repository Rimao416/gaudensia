import React, { useEffect } from "react";
import { dishes } from "../interface/dishes";

interface ItemModalProps {
  data: dishes;
  onClose: () => void; // Fonction pour fermer le modal
}

const ItemModal: React.FC<ItemModalProps> = ({ data, onClose }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initialisation
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`item-modal`}>
      <button onClick={onClose}>Fermer</button>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <ul>
        {data.prices.map((priceData, idx) => (
          <li key={idx}>
            {priceData.quantity} - {priceData.price} PLN
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemModal;
