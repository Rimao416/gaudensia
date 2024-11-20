import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { truncateTitle } from "../utils";
import { getCategories } from "../slice/categorySlice";
import Item from "../components/Item";
import Shopping from "../assets/shopping.png";
import {
  decrementItemQuantity,
  incrementItemQuantity,
} from "../slice/cartSlice";
import { useAuthOverlay } from "../context/useAuthOverlay";
import { useMessages } from "../context/useMessage";
import OrderModal from "../components/OrderModal";
function Menu() {
  const dispatch = useAppDispatch();
  const { categoriesWithDishes } = useAppSelector((state) => state.dishes);
  const { categories } = useAppSelector((state) => state.categories);
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const user = useAppSelector((state) => state.auth.user);
  const { setAuthOverlayVisible } = useAuthOverlay();
  const { setMessage } = useMessages();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>("all"); // "all" actif par défaut

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId); // Définir la catégorie active
  };

  useEffect(() => {
    dispatch(fetchMenuByCategories());
    dispatch(getCategories());
  }, [dispatch]);
  const handleSubmit = () => {
    // Check if user is connected
    if (!user) {
      setMessage("Veuillez vous connecter pour passer une commande", "warning");
      setAuthOverlayVisible(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
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
                    <div className="table__order--box">
                      {items.map((item) => (
                        <div className="table__order--wrapper">
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
                              onClick={() =>
                                dispatch(decrementItemQuantity(item.id))
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <FaMinus />
                            </span>
                            <span
                              onClick={() =>
                                dispatch(incrementItemQuantity(item.id))
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <FaPlus />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="button button__outline"
                      style={{ width: "100%", marginTop: "1rem" }}
                      onClick={handleSubmit}
                    >
                      Confirmer pour {totalPrice} PLN
                    </button>
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
      {isModalOpen && (
        <OrderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}

export default Menu;
