// import React from 'react'
import Logo from "../assets/logo_small.png";
// import Header_1 from "../assets/header_1.jpg";
// import Header_2 from "../assets/header_2.jpg";
import Matiti from "../assets/pic4.png";
import Brochette from "../assets/pic1.png";
import Button from "../components/Button";
import { MenuCategory, myMenu, WHY_CHOOSE_US } from "../constants/data";
import { FaPlus } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useState } from "react";

const menuItems = [
  { label: "Accueil", link: "#" },
  { label: "A Propos", link: "#" },
  { label: "Avantages", link: "#" },
  { label: "Temoignages", link: "#" },
];
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
  // const imagesHeader = [Header_1, Header_2,
  // const random_menu=myMenu.categories[Math.floor(Math.random() * myMenu.categories.length)];
  // console.log(random_menu)

  const random_menu = useState<MenuCategory>(
    myMenu.categories[Math.floor(Math.random() * myMenu.categories.length)]
  );
  console.log(random_menu);

  return (
    <div className="app">
      <section className="navigation">
        <img src={Logo} alt={Logo} />
        <div className="navigation__wrapper">
          <ul className="navigation__list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
          <span>
            {/* <svg width="800px" height="800px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" id="Слой_1" version="1.1" xml:space={"preserve" }xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

<g>

<rect fill="#1D1D1B" height="1" width="11" x="0.5" y="5.5"/>

<rect fill="#1D1D1B" height="1" width="11" x="0.5" y="2.5"/>

<rect fill="#1D1D1B" height="1" width="11" x="0.5" y="8.5"/>

</g>

</svg> */}
          </span>
        </div>
      </section>
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
            <Button text="Reserver" type="outline" onClick={() => {}} />
            <Button text="En savoir plus" type="inline" onClick={() => {}} />
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
        <div className="daily__header">
          <h1>Menu Du Jour</h1>
          <div className="daily__line">
            <span className="daily__icon">
              <IoArrowBackSharp />
            </span>
            <span className="daily__icon">
              <IoArrowForwardOutline />
            </span>
          </div>
        </div>

        <div className="daily__wrapper">
          <Swiper
            modules={[Autoplay]}
            loop
            slidesPerView={4}
            spaceBetween={40}
            speed={2000}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
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
                <span className="daily__item--plus">  <FaPlus /></span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default Home;
