import { useMemo, useState } from "react";
import {
  addItemToCartDb,
  decrementItemQuantity,
  incrementItemQuantity,
} from "../slice/cartSlice";
import { FaArrowLeft } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../store/store";
import { IoIosArrowForward } from "react-icons/io";
import AllergiaModal from "../components/AllergiaModal";
import { useMessages } from "../context/useMessage";
import { useNavigate } from "react-router-dom";
import MessageDisplay from "../components/MessageDisplay";
function Checkout() {
  interface ErrorType extends Error {
    message: string;
  }
  const navigate = useNavigate();
  const { setMessage } = useMessages();
  const { items, allergies, deliveryAddress, deliveryDetails } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOrder = async () => {
    try {
      await dispatch(
        addItemToCartDb({
          items,
          totalPrice,
          allergies,
          deliveryAddress,
          deliveryDetails,
        })
      ).unwrap();

      setMessage("Commande enregistrée", "success");
      // Ajouter ici des actions après succès de la commande (ex. redirection, message de succès)
    } catch (error: unknown) {
      setMessage((error as ErrorType).message, "error");
      // Ajouter ici un message d'erreur pour l'utilisateur
    }
  };

  return (
    <>
    <MessageDisplay/>
      <div className="order-summary">
        <div className="order-summary__details">
          <h1 className="order-summary__title">
            <span onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
              <FaArrowLeft />
            </span>
            Récapitulatif de la commande
          </h1>
          <p className="order-summary__products">{items.length} Commandes</p>

          <div className="order-summary__product-list">
            {items.map((item) => (
              <div className="order-summary__product" key={item.id}>
                <div className="order-summary__btn">
                  <button
                    className="order-summary__quantity-btn"
                    onClick={() => dispatch(decrementItemQuantity(item.id))}
                    aria-label="Decrement quantity"
                  >
                    -
                  </button>
                  <span className="order-summary__quantity">
                    {item.quantity}
                  </span>
                  <button
                    className="order-summary__quantity-btn"
                    onClick={() => dispatch(incrementItemQuantity(item.id))}
                    aria-label="Increment quantity"
                  >
                    +
                  </button>
                </div>
                <span className="order-summary__product-name">{item.name}</span>
                <span className="order-summary__price">{item.price} PNL</span>
              </div>
            ))}
          </div>

          <div className="order-summary__options">
            <div
              className="order-summary__option"
              style={{ position: "relative" }}
              onClick={() => setIsModalOpen(true)}
            >
              <h3 className="order-summary__option-title">Des allergies ?</h3>
              {allergies && (
                <p
                  className="order-summary__allergies"
                  style={{
                    position: "absolute",
                    top: "50px",
                    fontSize: "12px",
                  }}
                >
                  {allergies}
                </p>
              )}
              <div className="order-summary__option-btn">
                <span>
                  <IoIosArrowForward />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary__recap">
          <h3 className="order-summary__recap-title">Récapitulatif</h3>
          <ul className="order-summary__recap-list">
            <li>
              <span>Produits</span>
              <span>{totalPrice} PNL</span>
            </li>
            <li>
              <span>Livraison</span>
              <span>Gratuit</span>
            </li>
          </ul>
          <div
            className="order-summary__total"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <span>TOTAL </span>
            <span>{totalPrice} PNL</span>
          </div>
          <button
            className="button button__outline"
            style={{ marginTop: "10px", width: "100%" }}
            onClick={handleOrder}
          >
            Passer la commande
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AllergiaModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default Checkout;
