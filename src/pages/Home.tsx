import Navbar from "../components/Navbar";
import aniomationData from "../assets/animation.json";
import Testimonials from "../assets/testimonial.png";
import Lottie from "lottie-react";
import { AnimatePresence } from "framer-motion";
import {  useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../slice/categorySlice";
import Gaudensia from "../assets/header_1.jpg";
import { dishes } from "../interface/dishes";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper"; // Import du type Swiper
import Item from "../components/Item";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import useWhyChooseUs from "../components/useWhyChooseUs";
import { useGetDishesQuery } from "../slice/dishSlice";
import { useGetTestimonialsQuery } from "../slice/testimonialSlice";

const getRandomDishes = (dishes: dishes[] , count = 6) => {
  // Crée une copie du tableau de plats pour ne pas muter l'original
  const shuffled = [...dishes].sort(() => 0.5 - Math.random());
  // Sélectionne les 'count' premiers éléments après le mélange
  return shuffled.slice(0, count);
};

function Home() {
  const { t, i18n } = useTranslation();
  const whyChooseUs = useWhyChooseUs();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Null = Tous
  const swiperRef = useRef<SwiperCore | null>(null); // Définir le type de swiperRef
  const { data: dishes,refetch } = useGetDishesQuery();
  console.log(dishes);
  const { data: categories } = useGetCategoriesQuery();
  const {data:testimonials} = useGetTestimonialsQuery();
  // Vérifier si `dishes` est défini et est un tableau avant de l'utiliser
  const randomDishes = Array.isArray(dishes) ? getRandomDishes(dishes) : [];
  
  const filteredDishes = Array.isArray(dishes)
    ? selectedCategory
      ? dishes.filter((dish) => dish.category._id === selectedCategory)
      : dishes
    : [];
  
  const limitedDishes = filteredDishes.slice(0, 6); // Limiter à 6 plats maximum
  console.log(randomDishes);
  useEffect(() => {
    refetch();

  },[i18n.language,refetch]);

  return (
    <div className="app">
      <Navbar />
      <div className="header">
        <img src={Testimonials} alt="" className="header__testimonial" />
        <div className="header__wrapper">
          <h1>{t("homeTitle")}</h1>
          <p>{t("homeSubTitle")}</p>

          <div className="header__button">
            <button className="button button__outline">
              {t("homeButton")}
            </button>
          </div>
        </div>
        <div className="header__wrapper">
          <Lottie
            animationData={aniomationData}
            style={{ width: 600, height: 500 }}
          />
        </div>

        <div className="custom-shape-divider-bottom-1731570127">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
       <section className="why">
        {whyChooseUs.map((item) => (
          <div className="why__item" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div className="why__text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </section>
      
      <section className="daily">
        <h1>{t("shouldLike")}</h1>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Navigation]}
          loop
          slidesPerView={4}
          spaceBetween={40}
          speed={2000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="daily__wrapper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {randomDishes.map((item, index) => (
            <SwiperSlide key={index}>
              <Item {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      
      <section className="ads">
        <div className="ads__wrapper">
          <h1>{t("aboutTitle")}</h1>
          <p>{t("aboutDescription")}</p>
          <Button type="outline" onClick={() => console.log("Salut")}>
            <Link to="/a-propos">{t("aboutButton")}</Link>
          </Button>
        </div>
        <div className="ads__wrapper">
          <img src={Gaudensia} alt={Gaudensia} />
        </div>
        <div className="custom-shape-divider-top-1731589010">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      
      <section className="menu">
        <div className="menu__header">
          <h1>{t("menuTitle")}</h1>
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            speed={2000}
            className="menu__header--wrapper"
            breakpoints={{
              320: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {categories && (
              <>
                <SwiperSlide>
                  <div
                    className={`menu__header--item ${
                      selectedCategory === null ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    {t("menuAll")}
                  </div>
                </SwiperSlide>

                {categories.map((item, index) => (
                  <SwiperSlide key={index + 1}>
                    <div
                      className={`menu__header--item ${
                        selectedCategory === item._id ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(item._id)}
                    >
                      {item.name}
                    </div>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </div>
        <div className="menu__body">
          <AnimatePresence>
            {limitedDishes &&
              limitedDishes.map((item) => <Item key={item._id} {...item} />)}
          </AnimatePresence>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/menu" className="link link__outline">
            {t("menuButton")}
          </Link>
        </div>
      </section>
      
      <section className="testimonials">
        <h1 className="testimonials__title">{t("testimonialTitle")}</h1>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          speed={2000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="testimonials__wrapper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonials &&
            testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testimonials__item">
                  <p className="testimonials__item--description">
                    {item.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
