import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { dishes } from "../interface/dishes";
import BottomSheet from "./BottomSheet";
import Modal from "./Modal";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useMessages } from "../context/useMessage";
import { useTranslation } from "react-i18next";
import { addItemToCart } from "../slice/cartSlice";

interface ItemModalProps {
  data: dishes;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ data, onClose }) => {
  const { setMessage } = useMessages();
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const {t}=useTranslation()

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
  const handleAddToCart =async () => {
    await dispatch(
      addItemToCart({
        id: data._id,
        name: data.name,
        price: data.prices[0].price, // Prix unitaire
        quantity,
      })
    );
    setMessage("Article ajouté au panier", "success");
  };

  return (
    <>
      {isMobile ? (
        <BottomSheet
          isOpen={true}
          onClose={() => setIsMobile(true)}
          snapPoints={[400, 0]}
          initialSnap={0}
          draggableAt="both"
          paddingBottom={50}
        >
          <div>
            <div className="overlay__close" onClick={() => setIsMobile(true)} style={{position: "fixed", top: "-20px"}}>
              <span>
                <IoClose />
              </span>
            </div>
          </div>
          <div
            className="item__order"
            key={data._id}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <div className="item__order--header" style={{width: "80%"}}>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
              </div>
              <div className="item__order--body">
                <h2>{data.prices[0].quantity}</h2>
                <p>{data.prices[0].price} PLN</p>
              </div>
            </div>

            <div className="item__order--footer"
            style={{position: "fixed", bottom: "20px", width: "100%"}}>
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
                {`${t("AddInCardFor")} ${data.prices[0].price * quantity} PLN`}
              </button>
            </div>
          </div>
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
                {`${t("AddInCardFor")} ${data.prices[0].price * quantity} PLN`}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ItemModal;
