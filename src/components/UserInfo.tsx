import React from "react";
import { FaShoppingCart, FaBox, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importation des icônes
import { IconType } from "react-icons"; // Importation du type IconType
import ModalLayout from "../layouts/ModalLayout";
import { IoClose } from "react-icons/io5";
import i18next from "i18next";

// Définition de l'interface List avec des icônes inline
interface List {
  name: string;
  icon: IconType;
}

const myList: List[] = [
  { name: i18next.t("userDropdown.cart"), icon: FaShoppingCart }, // Icône Panier
  { name: i18next.t("userDropdown.order"), icon: FaBox }, // Icône Commande
  { name: i18next.t("userDropdown.account"), icon: FaUser }, // Icône Compte
  { name: i18next.t("userDropdown.logout"), icon: FaSignOutAlt }, // Icône Déconnexion
];

const IconList: React.FC = () => {
  return (
    <ModalLayout type="custom">
      <div className="overlay__close">
        <span>
          <IoClose />
        </span>
      </div>
      <div className="info">
        {myList.map((item, index) => (
          <div key={index} className="info__wrapper">
            <span>
              <item.icon /> {/* Icône inline */}
            </span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

export default IconList;
