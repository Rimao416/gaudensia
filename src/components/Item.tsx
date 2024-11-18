import React, { useState } from "react";
import { dishes } from "../interface/dishes";
import { truncateTitle } from "../utils";
import { FaPlus } from "react-icons/fa6";
import ItemModal from "./itemModal";

const Item: React.FC<dishes> = ({ name, description, prices, _id }) => {
  const [modalData, setModalData] = useState<Partial<dishes> | null>(null);

  const handleOpenModal = () => {
    setModalData({ name, description, prices, _id }); // Envoie des données à l'enfant
  };

  const handleCloseModal = () => {
    setModalData(null); // Ferme le modal
  };

  return (
    <>
      <div
        className="item"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModal}
      >
        <div>
          <h3>{truncateTitle(name, 30)}</h3>
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

      {modalData && <ItemModal data={modalData as dishes} onClose={handleCloseModal} />}
    </>
  );
};

export default Item;
