import GoogleIcon from "../assets/google-maps.png";
import Location from "../assets/location.png";
import { format } from "date-fns";
import { order } from "../interface/order";
import OrderComponent from "./Order";
import { truncateTitle } from "../utils";
// import { order } from '../interface/order'

interface OrderDetailsProps {
  order: order;
}

function OrderDetails({ order }: OrderDetailsProps) {
  console.log(order);
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy");
  return (
    <div className="orderDetails">
      <h4>Commande Du {formattedDate}</h4>
      <div className="orderDetails__container">
        {order.items.map((item) => (
          <div className="orderDetails__wrapper">
            <p className="orderDetails__container--quantity">
              X{item.quantity}
            </p>
            <div className="orderDetails__menu">
              <p className="orderDetails__container--name">{item.name}</p>
              <p>
                {item.description
                  ? item.description
                  : truncateTitle("------", 200)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h4 className="orderDetails__title">Informations de livraison</h4>
      <div className="orderDetails__address">
        <div>
          <span>
            <img src={GoogleIcon} alt="google maps icon" />
          </span>
          <p>{order.deliveryAddress}</p>
        </div>
        <div>
          <span>
            <img src={Location} />
          </span>
          <p> {order.deliveryDetails}</p>
        </div>
      </div>

      <h4 className="orderDetails__title">Récapitulatif</h4>
      <div className="orderDetails__recap">
        <div className="orderDetails__recap--wrapper">
          <p>Livraison</p>
          <p>Produits</p>
          <p>Total</p>
        </div>
        <div className="orderDetails__recap--wrapper">
          <p>Sans Frais</p>
          <p>{order.totalPrice}</p>
          <p>{order.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
