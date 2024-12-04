import { useEffect, useState } from "react";
import Logo from "../assets/logo_small.png";
import Logo_White from "../assets/logo_small_red.png";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { useOverlay } from "../context/useOverlay";
import CartUser from "./CartUser";
import { useAuthOverlay } from "../context/useAuthOverlay";
import Auth from "./Auth";
import MessageDisplay from "./MessageDisplay";
import BottomSheet from "./BottomSheet";
import { TfiWorld } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import UserInfo from "./UserInfo";
import { useGetUserQuery } from "../slice/authSlice";

function Navbar() {
  const location = useLocation();
  const [isUserToggle, setIsUserToggle] = useState(false);
  const { isOverlayVisible, setOverlayVisible } = useOverlay();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { isAuthOverlayVisible, setAuthOverlayVisible } = useAuthOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user } = useGetUserQuery();
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

  // const handleCartClick = () => {
  //   if (window.innerWidth < 768) {
  //     setSheetOpen(true); // Ouvre le BottomSheet en mode mobile
  //   } else {
  //     setOverlayVisible(true); // Affiche l'overlay sur desktop
  //   }
  // };

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
          <div className="navigation__icons">
            {user ? (
              <div
                className="navigation__user"
                onClick={() => setIsUserToggle(!isUserToggle)}
              >
                <span>
                  <FaUserAlt />
                </span>
                <p>{user?.fullName}</p>
                <span>
                  <IoIosArrowDown />
                </span>
                {isUserToggle && <UserInfo />}
              </div>
            ) : (
              <button
                className="button button__outline"
                onClick={authModalOpen}
              >
                Connexion
              </button>
            )}
            <div className="navigation__icons--language">
              <span className="navigation__icons--world">
                <TfiWorld />
              </span>
              <p>FR</p>
              <span className="navigation__icons--arrow">
                <IoIosArrowDown />
              </span>
            </div>
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
          initialSnap={1}
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
