import { decrementItemQuantity, incrementItemQuantity } from "../slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { IoIosArrowForward } from "react-icons/io";

function Checkout() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch=useAppDispatch()
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="order-summary">
      <div className="order-summary__details">
        <h1 className="order-summary__title">Récapitulatif de la commande</h1>
        <p className="order-summary__products">{items.length} Commandes</p>

        <div className="order-summary__product-list">
          {items.map((item) => (
            <div className="order-summary__product" key={item.id}>
              <div className="order-summary__btn">
                <button className="order-summary__quantity-btn" onClick={()=>dispatch(decrementItemQuantity(item.id))}>-</button>
                <span className="order-summary__quantity">{item.quantity}</span>
                <button className="order-summary__quantity-btn"
                onClick={() =>
                    dispatch(incrementItemQuantity(item.id))
                  }
                >+</button>
              </div>
              <span className="order-summary__product-name">{item.name}</span>
              <span className="order-summary__price">{item.price} PNL</span>
            </div>
          ))}
        </div>

        <div className="order-summary__options">
          <div className="order-summary__option">
            <h3 className="order-summary__option-title">Des allergies ?</h3>
            <div className="order-summary__option-btn"><span>
                <IoIosArrowForward/>
                </span></div>
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
            <span>
              Gratuit
            </span>
          </li>
      
        </ul>
        <div className="order-summary__total" style={{ display: "flex", justifyContent: "space-between",fontWeight:"bold" }}>
          <span>TOTAL   </span>
          <span>{totalPrice} PNL</span>
        </div>
        <button className="button button__outline" style={{ marginTop: "10px", width: "100%" }}>Passer la commande</button>
      </div>
    </div>
  );
}

export default Checkout;
