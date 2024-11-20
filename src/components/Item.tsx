import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dishes } from "../interface/dishes";
import { truncateTitle } from "../utils";
import { FaPlus } from "react-icons/fa6";
import ItemModal from "./itemModal";
import { RootState } from "../store/store";

const Item: React.FC<dishes> = ({ name, description, prices, _id }) => {
  const [modalData, setModalData] = useState<Partial<dishes> | null>(null);

  // Accéder au cart pour vérifier si l'article est déjà dans le panier
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === _id);
  const itemCount = cartItems.filter((item) => item.id === _id).length;
  const handleOpenModal = () => {
    setModalData({ name, description, prices, _id }); // Envoie des données à l'enfant
  };

  const handleCloseModal = () => {
    setModalData(null); // Ferme le modal
  };

  return (
    <>
      <div
        className={`item ${isInCart ? "item--in-cart" : ""}`} // Ajouter une classe si l'article est dans le panier
        style={{ cursor: "pointer" }}
        onClick={handleOpenModal}
      >
        <div>
          <h3>{truncateTitle(name, 30)}&nbsp;&nbsp;&nbsp; {isInCart && `(x${itemCount})`}</h3>
          <p>{truncateTitle(description, 60)}</p>
        </div>
        <ul className="item__price">
          <div className="item__list">
            {prices.map((priceData, idx) => (
              <li key={idx}>
                {priceData.quantity} - {priceData.price} PLN 
              </li>
            ))}
          </div>
          <div className="item__plus">
            <FaPlus />
          </div>
        </ul>
      </div>

      {modalData && (
        <ItemModal data={modalData as dishes} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Item;
