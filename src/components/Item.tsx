import React from "react";
import { dishes } from "../interface/dishes";
import { truncateTitle } from "../utils";
import { Link } from "react-router-dom";

const Item: React.FC<dishes> = ({ _id, name, description, prices }) => {
  return (
    <Link className="item" to={`/plats/${_id}`}>
      <div>
        <h3>{truncateTitle(name, 30)}</h3>
        <p>{truncateTitle(description, 60)}</p>
      </div>
      <ul className="item__price">
        {prices.map((priceData, idx) => (
          <li key={idx}>
            {priceData.quantity} - {priceData.price} PLN
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default Item;
