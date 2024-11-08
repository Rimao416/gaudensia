import { useEffect, useState } from "react";
import Logo from "../assets/logo_small.png";
import Logo_White from "../assets/logo_small_white.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useOverlay } from "../context/useOverlay";
import CartUser from "./CartUser";
import { useAuthOverlay } from "../context/useAuthOverlay";
import Auth from "./Auth";
import MessageDisplay from "./MessageDisplay";
import { useAppSelector } from "../store/store";
import BottomSheet from "./BottomSheet";
import UserDisplay from "./UserDisplay";

function Navbar() {
  const location = useLocation();
  const { isOverlayVisible, setOverlayVisible } = useOverlay();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { isAuthOverlayVisible, setAuthOverlayVisible } = useAuthOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [isScrolled, setIsScrolled] = useState(false);

  const authModalOpen = () => {
    setOverlayVisible(false);
    setAuthOverlayVisible(true);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (window.innerWidth < 768) {
      setSheetOpen(true); // Ouvre le BottomSheet en mode mobile
    } else {
      setOverlayVisible(true); // Affiche l'overlay sur desktop
    }
  };

  const menuItems = [
    { label: "Accueil", link: "/" },
    { label: "A Propos", link: "/a-propos" },
    { label: "Menu", link: "/menu" },
    { label: "Avis", link: "/temoignages" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <>
      <section
        className={`navigation ${isScrolled ? "navigation--scrolled" : ""}`}
      >
        <div className="navigation__left">
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
          <img src={isScrolled ? Logo : Logo_White} alt="Logo" />
        </div>
        <div className="navigation__wrapper">
          <ul className="navigation__list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `${
                      isActive ||
                      (location.pathname === "/" && item.link === "/")
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
            <UserDisplay user={user} isScrolled={isScrolled} authModalOpen={authModalOpen} />
            <span className="navigation__icon" onClick={handleCartClick}>
              <div>
                <p className="navigation__counter">0</p>
                <FaShoppingCart />
              </div>
              <p>Mon Panier</p>
            </span>
          </div>
        </div>
        <div className={`navigation__dropdown ${isOpen ? "open" : ""}`}>
          <div className="navigation__dropdown--wrapper">
            <img src={Logo} alt="Logo" />
            <ul className="navigation__dropdown--list">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive ||
                      (location.pathname === "/" && item.link === "/")
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
        {isOverlayVisible && <CartUser />}
        {isAuthOverlayVisible && <Auth />}
      </section>
      {isSheetOpen && (
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setSheetOpen(false)}
          snapPoints={[400, 0]}
          initialSnap={0}
          draggableAt="both"
          paddingBottom={50}
        >
          <p>Contenu personnalisé ici !</p>
        </BottomSheet>
      )}
      <MessageDisplay />
    </>
  );
}

export default Navbar;
