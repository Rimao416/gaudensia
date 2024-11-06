import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Bnr from "../assets/bnr2.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import { Link } from "react-router-dom";

function Menu() {
  const dispatch = useAppDispatch();
  const { categoriesWithDishes } = useAppSelector((state) => state.dishes);
  useEffect(() => {
    dispatch(fetchMenuByCategories());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="table">
        <div className="table__header">
          {/* <img src={Testimonial} alt={Testimonial} className="menu__testimonial"/> */}
          <img src={Bnr} alt={Bnr} className="table__banner" />
          <h1 className="table__title">Menu</h1>
        </div>
        <div className="table__body">
          {categoriesWithDishes.map((category) => (
            <div className="table__row" key={category.category._id}>
              <Link className="table__col" to="#">
                <h2 className="table__main">{category.category.name}</h2>
                <ul className="table__list">
                  {category.dishes.map((dish) => (
                    <li key={dish._id} className="table__item">
                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>
                      <ul >
                        {dish.prices.map((priceData, idx) => (
                          <li key={idx}>
                            {priceData.quantity} - {priceData.price} PLN
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
