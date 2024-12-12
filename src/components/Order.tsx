import { order } from "../interface/order";
import { format } from "date-fns";
import { truncateTitle } from "../utils";

// Ajoutez "onClick" dans les props
function OrderComponent({ 
  items, 
  createdAt, 
}: order) {
  const formattedDate = format(new Date(createdAt), "dd/MM/yyyy");


  return (
    <>
        <h4>Commande Du {formattedDate}</h4>
        <div className="myOrder__container">
          <p className="myOrder__container--quantity">X5</p>
          <div className="myOrder__menu">
            <p className="myOrder__container--name">{items[0].name}</p>
            <p>
              {items[0].description
                ? items[0].description
                : truncateTitle(
                    "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
                    200
                  )}
            </p>
          </div>
        </div>
        <div className="myOrder__bottom">
          <p className="myOrder__bottom--price">150 PNL</p>
          <button className="button button__outline">Recommander</button>
        </div>
    </>
  );
}

export default OrderComponent;
