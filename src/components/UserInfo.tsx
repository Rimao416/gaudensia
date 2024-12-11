import React from "react";
import { FaShoppingCart, FaBox, FaUser, FaSignOutAlt } from "react-icons/fa";
import ModalLayout from "../layouts/ModalLayout";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface List {
  name: string;
  icon: React.ElementType;
}

const IconList: React.FC = () => {
  const { t } = useTranslation(); // Hook pour les traductions

  const myList: List[] = [
    { name: t("userDropdown.order"), icon: FaBox },
    { name: t("userDropdown.account"), icon: FaUser },
    { name: t("userDropdown.logout"), icon: FaSignOutAlt },
  ];

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
              <item.icon />
            </span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

export default IconList;
