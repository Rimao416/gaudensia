import { useState } from "react";
import Logo from "../assets/logo_small.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import { motion } from "framer-motion";
import { useOverlay } from "../context/useOverlay";

function Navbar() {
  const location = useLocation();
  const { isOverlayVisible, setOverlayVisible } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState(0);

  // Fonction de bascule du menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "Accueil", link: "/" },
    { label: "A Propos", link: "/a-propos" },
    { label: "Menu", link: "/avantages" },
    { label: "Avis", link: "/temoignages" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <section className="navigation">
      <img src={Logo} alt="Logo" />
      <div className="navigation__wrapper">
        <ul className="navigation__list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive || (location.pathname === "/" && item.link === "/")
                    ? "active"
                    : ""
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navigation__icons">
          <Button type="inline" onClick={() => setOverlayVisible(false)}>
            Connexion
          </Button>
          <span
            className="navigation__icon"
            onClick={() => setOverlayVisible(true)}
          >
            <p className="navigation__counter">{card}</p>
            <FaShoppingCart />
          </span>
        </div>
      </div>

      {/* Icône du menu burger */}
      <motion.div className="navigation__toggle" onClick={toggleMenu}>
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.1 }}
        />

        <motion.span
          animate={{
            transform: !isOpen ? "translateX(0)" : "translateX(20px)",
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.1 }}
        />

        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.1 }}
          style={isOpen ? { width: "100%" } : {}}
        />
      </motion.div>

      {/* Menu déroulant pour le mobile */}
      <div className={`navigation__dropdown ${isOpen ? "open" : ""}`}>
        <div className="navigation__dropdown--wrapper">
          <img src={Logo} alt="Logo" />
          <ul className="navigation__dropdown--list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive || (location.pathname === "/" && item.link === "/")
                      ? "active"
                      : ""
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay__content">
            <button
              className="overlay__close"
              onClick={() => setOverlayVisible(false)}
            >
              &times;
            </button>

            {card === 0 ? (
              <h1
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Votre panier est vide
              </h1>
            ) : (
              <>
                <h2>Welcome Back</h2>
                <p>
                  We'd love to have you join our network of creators &
                  freelancers.
                </p>
                <button className="overlay__google-button">
                  Sign Up with Google
                </button>
                <div className="overlay__divider">OR</div>
                <form>
                  <label>Email*</label>
                  <input type="email" placeholder="Enter Your Email" required />
                  <label>Password*</label>
                  <input
                    type="password"
                    placeholder="Enter a Password"
                    required
                  />
                  <button type="submit" className="overlay__submit">
                    Sign In
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Navbar;
