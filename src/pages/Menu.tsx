import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { truncateTitle } from "../utils";
import { getCategories } from "../slice/categorySlice";
import { FaSearch } from "react-icons/fa";
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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
      <div className="parent">
        <Navbar />
        {isModalVisible && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }} // invisible au départ
              animate={{ opacity: 0.5 }} // devient semi-transparent lorsque modal visible
              exit={{ opacity: 0 }} // disparaît lorsque le modal est fermé
              transition={{ duration: 0.2 }} // animation plus rapide
            />

            <motion.div
              className="recherche"
              initial={{ top: "-100%" }} // initial position off-screen
              animate={{ top: 0 }} // animate to top of the page
              exit={{ top: "-100%" }} // animate out off-screen
              transition={{ type: "spring", stiffness: 200, damping: 30 }} // animation plus rapide
            >
              <div className="recherche__container">
                <div className="recherche__wrapper">
                  <FaSearch className="recherche__icon" />
                  <input
                    className="recherche__input"
                    type="text"
                    placeholder="Rechercher un plat dans le menu"
                  />
                </div>
                <span>
                  <FaSearch className="recherche__button" />
                </span>
              </div>
            </motion.div>
          </>
        )}

        {/* Le modal */}
        <div className="table">
          <div className="table__up">
            <div className="table__up--text">
              <h1>À Table !</h1>
              <p>
                Venez découvrir un menu savoureux, où chaque plat est une
                invitation à la gourmandise. Explorez nos recettes, choisissez
                vos favoris et régalez-vous en un clin d'œil !
              </p>
              <p className="cart">Voir les commandes en cours</p>
            </div>
            <div className="custom-shape-divider-bottom-1732082832">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>
          <div className="table__body">
            <div className="table__header">
              <div className="table__dropdown" onClick={toggleModal}>
                <FaSearch className="table__icondrop" />
              </div>
              <div className="table__search">
                <IoMdSearch className="table__icon" />
                <input type="text" placeholder="Rechercher" />
              </div>
              <Swiper
                className="table__categories"
                modules={[Navigation]}
                slidesPerView={4}
                spaceBetween={40}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
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
