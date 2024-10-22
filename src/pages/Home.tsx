// import React from 'react'
import Logo from "../assets/logo_small.png";
// import Header_1 from "../assets/header_1.jpg";
// import Header_2 from "../assets/header_2.jpg";
// import Header_3 from "../assets/header_3.jpg";

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
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>

        </section>
        <section className="header"></section>
      
    </div>
  );
}

export default Home;
