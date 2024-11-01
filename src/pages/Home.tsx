// import React from 'react'

import { AnimatePresence, motion } from "framer-motion";
import Testimonials from "../assets/testimonial.png";
import Matiti from "../assets/pic4.png";
import Can from "../assets/can.png";
import Citation from "../assets/citation.png";
import { BsTiktok } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Brochette from "../assets/pic1.png";
import Button from "../components/Button";
import { MenuCategory, myMenu, WHY_CHOOSE_US } from "../constants/data";
import Gaudensia from "../assets/gaudensia.png";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePhone } from "react-icons/md";
import About from "../assets/about.png";
import Dishe from "../assets/restaurants-wrap-bg.png";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCategories } from "../slice/categorySlice";
import { getDishes } from "../slice/dishSlice";
import { getTestimonials } from "../slice/testimonialSlice";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import type { Swiper as SwiperCore } from "swiper"; // Import du type Swiper
import { Link } from "react-router-dom";
import Lien from "../components/Lien";

const truncateTitle = (title: string | undefined, length: number = 20) => {
  if (title) {
    if (title.length > length) {
      return title.substring(0, length) + "...";
    } else {
      return title;
    }
  }
};
function Home() {
  const dispatch = useAppDispatch();
  const swiperRef = useRef<SwiperCore | null>(null); // Définir le type de swiperRef

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Null = Tous
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDishes());
    dispatch(getTestimonials());
  }, [dispatch]);
  const { categories } = useAppSelector((state) => state.categories);
  const { dishes } = useAppSelector((state) => state.dishes);
  const { testimonials } = useAppSelector((state) => state.testimonials);
  console.log(dishes);
  const filteredDishes = Array.isArray(dishes)
    ? selectedCategory
      ? dishes.filter((dish) => dish.category._id === selectedCategory)
      : dishes
    : [];
  const limitedDishes = filteredDishes.slice(0, 6); // Limiter à 6 plats maximum

  const random_menu = useState<MenuCategory>(
    myMenu.categories[Math.floor(Math.random() * myMenu.categories.length)]
  );
  console.log(random_menu);

  return (
    <div className="app">
      <Navbar />
      <section className="header">
        <div className="header__bigline"></div>
        <img src={Matiti} alt={Matiti} className="header__matiti" />
        <div className="header__wrapper">
          <p className="header__thumbnail">Explorer le monde des délices</p>
          <h1 className="header__title">
            Des saveurs uniques à partager autour de moments précieux.
          </h1>
          <p>
            Une expérience culinaire où chaque plat raconte une histoire,
            alliant saveurs uniques et moments de partage inoubliables.
          </p>
          <div className="header__button">
            <Lien to="/a-propos" type="outline" redirection={"À Propos de nous"} />
            <Lien to="/contact" type="inline" redirection={"Nous Contacter"} />
           
          </div>
        </div>
        <img src={Brochette} alt={Brochette} className="header__brochette" />
      </section>
      <section className="why">
        {WHY_CHOOSE_US.map((item) => (
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
        <img src={About} alt={About} className="daily__yellow" />
        <div className="daily__header">
          <h1>Menu Du Jour</h1>
          <div className="daily__line">
            <span
              className="daily__icon daily__prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <IoArrowBackSharp />
            </span>
            <span
              className="daily__icon daily__next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <IoArrowForwardOutline />
            </span>
          </div>
        </div>

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
          {random_menu[0].dishes.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="daily__item">
                <div className="daily__item--wrapper">
                  <h4 className="daily__item--title">
                    {truncateTitle(item.name)}
                  </h4>
                  <p className="daily__item--description">
                    {truncateTitle(item.description)}
                  </p>
                </div>
                <p className="daily__item--price">{item.prices[0].price} PNL</p>
              </div>
              <span className="daily__item--plus">
                {" "}
                <FaPlus />
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="ads">
        <div className="ads__wrapper">
          <h1>Bienvenue dans l'univers culinaire de Gaudensia</h1>
          <p>
            Dans sa cuisine, elle ne se contente pas de préparer des repas ;
            elle crée des histoires, des souvenirs et un sentiment
            d'appartenance. Chaque recette est une invitation à explorer des
            saveurs inoubliables et à partager des moments précieux autour de la
            table.
          </p>

          <Button type="outline" onClick={() => {}}>
            <Link to="/a-propos">En Savoir Plus</Link>
          </Button>
        </div>
        <div className="ads__wrapper">
          <img src={Gaudensia} alt={Gaudensia} />
        </div>
      </section>
      <section className="menu">
        <img src={Dishe} alt={Dishe} className="menu__yellow" />
        <div className="menu__header">
          <h1>Notre Menu</h1>

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
                    Tous
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
              limitedDishes.map((item) => (
                <motion.div className="menu__item" key={item._id} layout>
                  <div className="menu__item--wrapper">
                    <h4 className="menu__item--title">{item.name}</h4>
                    <p className="menu__item--separator">
                      --------------------
                    </p>
                    <p className="menu__item--price">
                      {item.prices[0].price} PLN
                    </p>
                  </div>
                  <p className="menu__item--description">{item.description}</p>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="outline" onClick={() => {}}>
            <Link to="/menu">Voir tous nos plats</Link>
          </Button>
        </div>
      </section>
      <section className="testimonials">
        <img
          src={Testimonials}
          alt="testimonials"
          className="testimonials__image"
        />
        <h1 className="testimonials__title">Ce que nos clients disent</h1>
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
                  <img
                    src={Citation}
                    alt="citation"
                    className="testimonials__item--image"
                  />
                  <div className="testimonials__item--author">
                    <h4>{item.author}</h4>
                    <p>{item.mail}</p>
                  </div>
                  <p className="testimonials__item--description">
                    {item.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <section className="contact">
        <img src={Can} alt="can" className="contact__image" />
        <div className="contact__body">
          <div className="contact__body--wrapper">
            <div className="contact__body--header">
              <h1 className="contact__body--title">Donnez nous votre avis</h1>
              <p className="contact__body--description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur corrupti esse illo itaque id necessitatibus at ex
                quasi ea voluptates adipisci quam excepturi ut rerum, delectus
                corporis, expedita nisi tenetur!
              </p>
            </div>
            <div className="contact__body--form">
              <form className="contact__form">
                <div className="contact__form--wrapper">
                  <input type="text" placeholder="Nom" />
                  <input type="email" placeholder="Email" />
                </div>
                <textarea placeholder="Message"></textarea>
                <Button type="outline" onClick={() => {}} genre="submit">
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
          <div className="contact__body--wrapper">
            <div className="contact__body--title">
              <h1>Contat Info</h1>
              <p>Lorem ipsum dolor sit amet consectetur </p>
            </div>
            <div className="contact__body--info">
              <div className="contact__body--info--wrapper">
                <div className="contact__body--icon">
                  <FiMail />
                </div>
                <p>gmcuisinepl@gmail.com</p>
              </div>
              <div className="contact__body--info--wrapper">
                <div className="contact__body--icon">
                  <BsTiktok />
                </div>
                <p>The Passion Cuisine</p>
              </div>
              <div className="contact__body--info--wrapper">
                <div className="contact__body--icon">
                  <MdOutlinePhone />
                </div>
                <p>+48515421319</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
