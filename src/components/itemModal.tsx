import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { dishes } from "../interface/dishes";
import BottomSheet from "./BottomSheet";
import Modal from "./Modal";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addItemToCart } from "../slice/cartSlice";

interface ItemModalProps {
  data: dishes;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ data, onClose }) => {
  console.log(data);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  // Récupère la quantité actuelle dans le panier pour cet article
  const itemInCart = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === data._id)
  );
  const [quantity, setQuantity] = useState(
    itemInCart ? itemInCart.quantity : 1
  );

  // Gère la détection mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ajoute l'article au panier
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: data._id,
        name: data.name,
        price: data.prices[0].price, // Prix unitaire
        quantity,
      })
    );
  };

  return (
    <>
      {isMobile ? (
        <BottomSheet
          isOpen={true}
          onClose={() => setIsMobile(true)}
          snapPoints={[600, 400, 200, 0]}
          initialSnap={0}
          draggableAt="both"
          paddingBottom={50}
        >
          <p>Contenu personnalisé ici !</p>
        </BottomSheet>
      ) : (
        <Modal isOpen={true} onClose={onClose}>
          <div className="item__order">
            <div className="item__order--header">
              <h1>{data.name}</h1>
              <p>{data.description}</p>
            </div>
            <div className="item__order--body">
              <h2>{data.prices[0].quantity}</h2>
              <p>{data.prices[0].price} PLN</p>
            </div>
            <div className="item__order--footer">
              <div>
                {quantity > 1 && (
                  <span
                    className="item__order--minus"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <FaMinus />
                  </span>
                )}
                <h5>{quantity}</h5>
                <span
                  className="item__order--plus"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaPlus />
                </span>
              </div>
              <button
                className="button button__outline"
                onClick={handleAddToCart}
              >
                {`Ajouter pour ${data.prices[0].price * quantity} PLN`}
              </button>
            </div>
          </div>
          <p className="item__order--menu">Valider et continer vers le menu</p>
        </Modal>
      )}
    </>
  );
};

export default ItemModal;