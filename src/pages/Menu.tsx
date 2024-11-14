import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Bnr from "../assets/bnr2.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { truncateTitle } from "../utils";

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
          <img src={Bnr} alt={Bnr} className="table__banner" />
          <div className="table__title">
            <h1>Menu</h1>
          </div>
        </div>
        <div className="table__body">
          {categoriesWithDishes.map((category) => (
            <div className="table__row" key={category.category._id}>
              <div className="table__col">
                <Link to={`/menu/${category.category._id}`}>
                  <h2 className="table__main">{category.category.name}</h2>
                </Link>
                <Swiper
                  className="table__list"
                  slidesPerView={4}
                  spaceBetween={20}
                >
                  {category.dishes.map((dish, index) => (
                    <SwiperSlide key={index}>
                      <div className="table__item">
                        <div>
                          <h3>{truncateTitle(dish.name, 30)}</h3>
                          <p>{truncateTitle(dish.description, 60)}</p>
                        </div>
                        <ul className="table__price">
                          {dish.prices.map((priceData, idx) => (
                            <li key={idx}>
                              {priceData.quantity} - {priceData.price} PLN
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
