import React from "react";
import BottomSheet from "./BottomSheet";
import {
  CartItem,
  clearCart,
  decrementItemQuantity,
  incrementItemQuantity,
} from "../slice/cartSlice";
import Shopping from "../assets/shopping.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void; // Accept a boolean value
  items: CartItem[];
}

const BottomCart: React.FC<Props> = ({ isOpen, onClose, items }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const { setAuthOverlayVisible } = useAuthOverlay();

  const { setMessage } = useMessages();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    // Check if user is connected
    if (!user) {
      setMessage("Veuillez vous connecter pour passer une commande", "warning");
      setAuthOverlayVisible(true);
    } else {
      //   setIsModalOpen(true);
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => onClose(false)}
      snapPoints={[400]}
      initialSnap={0}
    >
      {items.length > 0 ? (
        <>
          <div className="table__order--box">
            {items.map((item) => (
              <div className="table__order--wrapper" key={item.id}>
                <ul className="table__order--list">
                  <li key={item.id} className="table__order--item">
                    <div className="table__order--details">
                      <h4>{item.name}</h4>
                      <p>Quantité : {item.quantity}</p>
                      <p>{item.price} PLN</p>
                    </div>
                  </li>
                </ul>
                <div className="table__order--options">
                  <span
                    onClick={() => dispatch(decrementItemQuantity(item.id))}
                    style={{ cursor: "pointer" }}
                  >
                    <FaMinus />
                  </span>
                  <span
                    onClick={() => dispatch(incrementItemQuantity(item.id))}
                    style={{ cursor: "pointer" }}
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="table__order--total"
            style={{
              width: "100%",
              position: "absolute",
              bottom: "20px",
              textAlign: "center",
            }}
          >
            <button
              className="button button__outline"
              style={{ width: "70%" }}
              onClick={handleSubmit}
            >
              Confirmer pour {totalPrice} PLN
            </button>
            {items.length > 0 && (
              <p onClick={() => dispatch(clearCart())}
              style={{
                cursor: "pointer",
                marginTop: "10px",
                color: "red",
                fontSize: "14px"
              }}
              >Vider le panier</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h3>Vous pouvez commander ici</h3>
          <img src={Shopping} alt="shopping" className="table__order--img" />
        </>
      )}

      {/* Contenu de BottomSheet */}
    </BottomSheet>
  );
};

export default BottomCart;
