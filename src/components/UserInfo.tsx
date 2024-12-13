import React from "react";
import { FaBox, FaUser, FaSignOutAlt } from "react-icons/fa";
import ModalLayout from "../layouts/ModalLayout";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface List {
  name: string;
  icon: React.ElementType;
  onClick: () => void;
}

interface IconListProps {
  setIsUserToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isUserToggle: boolean;
}

const IconList: React.FC<IconListProps> = ({
  setIsUserToggle,
  isUserToggle,
}) => {
  const navigate = useNavigate();
  const handleRedirection=(route:string)=>{
    navigate(route);
    setIsUserToggle(false);
  }

  const handleToggle = () => {
    setIsUserToggle(!isUserToggle);
  };
  const { t } = useTranslation(); // Hook pour les traductions


  const myList: List[] = [
    {
      name: t("userDropdown.order"),
      icon: FaBox,

      onClick: () => handleRedirection("/order"),
    },
    {
      name: t("userDropdown.account"),
      icon: FaUser,

      onClick: () => handleRedirection("/account"),
    },
    {
      name: t("userDropdown.logout"),
      icon: FaSignOutAlt,
      onClick: () => {
        console.log("Logged out");
        setIsUserToggle(false); // Exemple : fermer le toggle après logout
      },
    },
  ];

  return (
    <ModalLayout type="custom">
      <div className="overlay__close">
        <span onClick={handleToggle}>
          <IoClose />
        </span>
      </div>
      <div className="info">
        {myList.map((item, index) => (
          <div key={index} className="info__wrapper"
          onClick={item.onClick}
          >
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
