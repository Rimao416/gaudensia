import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Bnr from "../assets/bnr2.jpg";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchMenuByCategories } from "../slice/dishSlice";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper"; // Import du type Swiper
import "swiper/css";
import "swiper/css/pagination";
import { truncateTitle } from "../utils";
import { getCategories } from "../slice/categorySlice";

function Menu() {
  const dispatch = useAppDispatch();
  const { categoriesWithDishes } = useAppSelector((state) => state.dishes);
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchMenuByCategories());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="table">
        {/* <div className="table__wrapper">
          <img src={Bnr} alt={Bnr} className="table__banner" />
          <div className="table__title">
            <h1>Menu</h1>
          </div>
        </div> */}
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
                    <div className="table__category">
                      {truncateTitle(category.name, 15)}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
