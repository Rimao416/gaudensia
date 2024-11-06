import { useEffect, useState } from "react";
import Logo from "../assets/logo_small.png";
import Logo_White from "../assets/logo_small_white.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import { motion } from "framer-motion";
import { useOverlay } from "../context/useOverlay";
import CartUser from "./CartUser";
import { useAuthOverlay } from "../context/useAuthOverlay";
import Auth from "./Auth";

function Navbar() {
  const location = useLocation();
  const { isOverlayVisible, setOverlayVisible } = useOverlay();
  const { isAuthOverlayVisible, setAuthOverlayVisible } = useAuthOverlay();
  const [isOpen, setIsOpen] = useState(false);

  const authModalOpen = () => {
    setOverlayVisible(false);
    setAuthOverlayVisible(true);
  };
  // Fonction de bascule du menu
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isScrolled, setIsScrolled] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const menuItems = [
    { label: "Accueil", link: "/" },
    { label: "A Propos", link: "/a-propos" },
    { label: "Menu", link: "/menu" },
    { label: "Avis", link: "/temoignages" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <section
      className={`navigation ${isScrolled ? "navigation--scrolled" : ""}`}
    >
      <img src={isScrolled ? Logo : Logo_White} alt="Logo" />
      <div className="navigation__wrapper">
        <ul className="navigation__list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `${
                    isActive || (location.pathname === "/" && item.link === "/")
                      ? "active "
                      : ""
                  }
                  ${isScrolled ? "scrolled-link" : "default-link"}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navigation__icons">
          <Button type="inline" onClick={authModalOpen}>
            Connexion
          </Button>
          <span
            className="navigation__icon"
            onClick={() => setOverlayVisible(true)}
          >
            <p className="navigation__counter">0</p>
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
      {isOverlayVisible && <CartUser />}
      {isAuthOverlayVisible && <Auth />}
    </section>
  );
}

export default Navbar;
