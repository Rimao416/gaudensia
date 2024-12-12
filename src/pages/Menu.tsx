import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Navigation } from "swiper/modules";
import { truncateTitle } from "../utils";
import { FaSearch, FaTimes } from "react-icons/fa";
import Item from "../components/Item";
import Shopping from "../assets/shopping.png";
import {
  incrementItemQuantity,
  decrementItemQuantity,
} from "../slice/cartSlice";
import { useAuthOverlay } from "../context/useAuthOverlay";
import { useMessages } from "../context/useMessage";
import OrderModal from "../components/OrderModal";
import BottomCart from "../components/BottomCart";
import {
  useFetchMenuByCategoriesQuery,
  useSearchDishQuery,
} from "../slice/dishSlice";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../slice/categorySlice";
function Menu() {
  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>(""); // Terme soumis
  const [_isSearching, setIsSearching] = useState(false); // Nouvel état
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { data: categoriesWithDishes, refetch } =
    useFetchMenuByCategoriesQuery();
  const { data: searchResults } = useSearchDishQuery(submittedSearch, {
    skip: !submittedSearch.trim(), // Pas de requête si le terme soumis est vide
  });
  const { data: categories } = useGetCategoriesQuery();
  const [isBottomCartOpen, setIsBottomCartOpen] = useState(false);
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const user = useAppSelector((state) => state.auth.user);
  const { setAuthOverlayVisible } = useAuthOverlay();
  const { setMessage } = useMessages();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableUnderlineRef = useRef<HTMLDivElement | null>(null); // Référence à la div table__underline
  const [activeCategory, setActiveCategory] = useState<string>("all"); // "all" actif par défaut
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId); // Définir la catégorie active
    const targetElement = categoryRefs.current[categoryId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true); // Met à jour isFocused à true lorsque l'input reçoit le focus
  };

  const resetString = () => {
    setSubmittedSearch("");
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tableUnderlineRef.current &&
      !tableUnderlineRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false); // Si le clic est en dehors de table__underline, on perd le focus
    }
  };

  useEffect(() => {
    // Ajouter un écouteur de clic pour fermer le focus quand on clique en dehors
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Nettoyer l'écouteur quand le composant est démonté
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    refetch();
  }, [i18n.language, refetch]);

  const handleSubmit = () => {
    // Check if user is connected
    if (!user) {
      setMessage("Veuillez vous connecter pour passer une commande", "warning");
      setAuthOverlayVisible(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setSubmittedSearch(search); // Met à jour le terme soumis avec la saisie actuelle

    // Simuler un délai pour montrer que la recherche est en cours
    setTimeout(() => setIsSearching(false), 500); // Simule un état de recherche

    // Fermer le modal
    // toggleModal();
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
              <form className="recherche__container" onSubmit={handleSearch}>
                {/* Container pour l'input et l'icône */}
                <div className="recherche__wrapper">
                  <input
                    className="recherche__input"
                    type="text"
                    placeholder="Rechercher un plat dans le menu"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {/* Icône de recherche à côté de l'input */}
                  <button type="submit" className="recherche__icon">
                    <FaSearch />
                  </button>
                </div>
                {/* Icône pour fermer le modal */}
                <FaTimes className="recherche__close" onClick={toggleModal} />
              </form>
            </motion.div>
          </>
        )}

        {/* Le modal */}
        <div className="table">
          <div className="table__up">
            <div className="table__up--text">
              <h1>{t("menuInfo")}</h1>
              <p>{t("menuDescription")}</p>
              <p
                className="cart"
                style={{ cursor: "pointer" }}
                onClick={() => setIsBottomCartOpen(true)}
              >
                {t("commandInProgressBar")}
              </p>
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
         
              <motion.div
                className="table__search"
                initial={{ width: "20%" }} // Largeur initiale
                animate={{ width: isFocused ? "50%" : "20%" }} // Animation en fonction de l'état de focus
                transition={{ type: "spring", stiffness: 200, damping: 25 }} // Animation fluide avec spring
              >
                <IoMdSearch className="table__icon" />
                <form action="" style={{ width: "100%" }} onSubmit={handleSearch}>

                <input
                  type="text"
                  placeholder="Rechercher"
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={handleFocus}
                />
                {isFocused && (
                  <div className="table__underline" ref={tableUnderlineRef}>
                    <span onClick={resetString}>
                      <RxCross2 />
                    </span>
                    <button
                      className="button button__outline"
                      type="submit"
                      
                    >
                      {t("search")}
                    </button>
                  </div>
                )}
                </form>
              </motion.div>

        
              <Swiper
                className="table__categories"
                modules={[Navigation]}
                slidesPerView={4}
                spaceBetween={40}
                style={isFocused ? { display: "none" } : {}}
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
              {submittedSearch.length > 0 && searchResults ? (
                <div className="table__container">
                  <div className="table__response">
                    <h1>
                      {t("searchCommand")}
                      {submittedSearch}"
                    </h1>
                    {/* Parcourir les résultats de recherche */}
                    <div className="table__items">
                      {searchResults.length != 0 ? (
                        searchResults.map((dish) => (
                          <Item key={dish._id} {...dish} />
                        ))
                      ) : (
                        <p>Aucun résultat trouvé pour "{search}".</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="table__container">
                  {/* Affichage par catégories lorsque la recherche n' est pas active */}
                  <div className="table__container">
                    {/* Affichage par catégories lorsque la recherche n'est pas active */}
                    {categoriesWithDishes &&
                      categoriesWithDishes.map((category) => (
                        <div
                          key={category.category._id}
                          className="table__content"
                          ref={(el) =>
                            (categoryRefs.current[category.category._id] = el)
                          } // Assigner la référence
                        >
                          <h2>{category.category.name}</h2>
                          <div className="table__items">
                            {category.dishes.map((dish) => (
                              <Item key={dish._id} {...dish} />
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="table__order">
                {items.length > 0 ? ( // Si le panier contient des éléments
                  <>
                    <h3>{t("uCommand")}</h3>
                    <div className="table__order--box">
                      {items.map((item) => (
                        <div className="table__order--wrapper" key={item.id}>
                          <ul className="table__order--list">
                            <li key={item.id} className="table__order--item">
                              <div className="table__order--details">
                                <h4>{item.name}</h4>
                                <p>
                                  {t("quantity")} : {item.quantity}
                                </p>
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
                      {t("confirmFor")} {totalPrice} PLN
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{t("commandHere")}</h3>
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
        {items.length > 0 && (
          <button
            className="button button__outline table__order--responsive"
            style={{
              position: "fixed",
              bottom: "1rem",
              textAlign: "center",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
            }}
            onClick={handleSubmit}
          >
            {t("confirmFor")} {totalPrice} PLN
          </button>
        )}

        <Footer />
      </div>
      {isModalOpen && (
        <OrderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      {isBottomCartOpen && (
        <BottomCart
          isOpen={isBottomCartOpen}
          onClose={setIsBottomCartOpen}
          items={items}
        />
      )}
    </>
  );
}

export default Menu;
