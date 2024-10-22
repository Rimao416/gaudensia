// import React from 'react'
import Logo from "../assets/logo_small.png";
// import Header_1 from "../assets/header_1.jpg";
// import Header_2 from "../assets/header_2.jpg";
import Matiti from "../assets/pic4.png";
import Brochette from "../assets/pic1.png";
import Button from "../components/Button";


const menuItems = [
  { label: "Accueil", link: "#" },
  { label: "A Propos", link: "#" },
  { label: "Avantages", link: "#" },
  { label: "Temoignages", link: "#" },
];

function Home() {
  // const imagesHeader = [Header_1, Header_2, Header_3];
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
        <img src={Matiti} alt={Matiti} className="header__matiti"/>
        <div className="header__wrapper">
        <p className="header__thumbnail">Explorer le monde des délices</p>
        <h1 className="header__title">Des aliments qui vous rendent heureux et en bonne santé</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quia illum architecto id numquam culpa eligendi eos recusandae</p>
        <div className="header__button">
          <Button text="Reserver" type="outline" onClick={() => {}} />
          <Button text="En savoir plus" type="inline" onClick={() => {}} />
        </div>
        </div>
        <img src={Brochette} alt={Brochette} className="header__brochette"/>
      </section>
    </div>
  );
}

export default Home;
