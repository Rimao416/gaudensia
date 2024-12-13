import React from "react";
import { FaBox, FaUser, FaSignOutAlt } from "react-icons/fa";
import ModalLayout from "../layouts/ModalLayout";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface List {
  name: string;
  icon: React.ElementType;
  link?: string;
}

const IconList: React.FC = () => {
  const { t } = useTranslation(); // Hook pour les traductions

  const myList: List[] = [
    { name: t("userDropdown.order"), icon: FaBox, link: "order" },
    { name: t("userDropdown.account"), icon: FaUser, link: "account" },
    { name: t("userDropdown.logout"), icon: FaSignOutAlt, link: "logout" },
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
            <Link to="/profile" className="info__link">
              <span>
                <item.icon />
              </span>
            </Link>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

export default IconList;
