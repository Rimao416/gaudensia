import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { truncateTitle } from "../utils";
import { getCategories } from "../slice/categorySlice";
import Item from "../components/Item";
import Shopping from "../assets/shopping.png";
function Menu() {
  const dispatch = useAppDispatch();
  const { categoriesWithDishes } = useAppSelector((state) => state.dishes);
  const { categories } = useAppSelector((state) => state.categories);
  const { items } = useAppSelector((state) => state.cart);

  const [activeCategory, setActiveCategory] = useState<string>("all"); // "all" actif par défaut

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId); // Définir la catégorie active
  };

  useEffect(() => {
    dispatch(fetchMenuByCategories());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="table">
        <div className="table__body">
          <div className="table__header">
            <div className="table__search">
              <IoMdSearch className="table__icon" />
              <input type="text" placeholder="Rechercher" />
            </div>
            <Swiper
              className="table__categories"
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween={40}
            >
              {categories &&
                categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <div
                      className={`table__category ${
                        activeCategory === category._id
                          ? "table__category--active"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(category._id)}
                    >
                      {truncateTitle(category.name, 15)}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="table__wrapper">
            <div className="table__container">
              {categoriesWithDishes &&
                categoriesWithDishes.map((category) => (
                  <div key={category.category._id} className="table__content">
                    <h2>{category.category.name}</h2>
                    <div className="table__items">
                      {category.dishes.map((dish) => (
                        <Item key={dish._id} {...dish} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="table__order">
              {items.length > 0 ? ( // Si le panier contient des éléments
              <>
              <h3>Votre Commande</h3>
              
              <ul className="table__order--list">
                  {items.map((item) => (
                    <li key={item.id} className="table__order--item">
                      <div className="table__order--details">
                        <h4>{item.name}</h4>
                        <p>Quantité : {item.quantity}</p>
                        <p>Prix : {item.price} PLN</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
                
              ) : (
                <>
                  <h3>Vous pouvez commander ici</h3>
                  <img
                    src={Shopping}
                    alt="shopping"
                    className="table__order--img"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
