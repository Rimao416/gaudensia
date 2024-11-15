import React from "react";
import { FaShoppingCart, FaBox, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importation des icônes
import { IconType } from "react-icons"; // Importation du type IconType
import ModalLayout from "../layouts/ModalLayout";
import { IoClose } from "react-icons/io5";

// Définition de l'interface List avec des icônes inline
interface List {
  name: string;
  icon: IconType;
}

const myList: List[] = [
  { name: "Panier", icon: FaShoppingCart }, // Icône Panier
  { name: "Commande", icon: FaBox }, // Icône Commande
  { name: "Compte", icon: FaUser }, // Icône Compte
  { name: "Déconnexion", icon: FaSignOutAlt }, // Icône Déconnexion
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
