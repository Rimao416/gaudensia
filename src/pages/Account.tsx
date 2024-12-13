import React from "react";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
interface AccountItem {
  icon: React.ElementType; // Type pour les icônes React
  info: string;
  action: string;
}
function Account() {
  const { t } = useTranslation();
  const accountItems: AccountItem[] = [
    { icon: FaUser, info: "Omari Kayumba", action: "Modifier" },
    {
      icon: FaEnvelope,
      info: "omarkayumba12345@gmail.com",
      action: "Modifier",
    },
    { icon: FaLock, info: "Changer le mot de passe", action: "Modifier" },
    {
      icon: FaPhone,
      info: "Modifier le numéro de téléphone",
      action: "Modifier",
    },
    { icon: FaCreditCard, info: "Moyens de paiement", action: "Modifier" },
    { icon: FaShieldAlt, info: "Gérer la confidentialité", action: "Modifier" },
  ];
  return (
    <div className="parent">
      <Navbar />
      <div className="account">
        <div className="account__up">
          <div className="account__up--text">
            <h1>{t("menuInfo")}</h1>
            <p>{t("menuDescription")}</p>
            <p></p>
          </div>
          <div className="custom-shape-divider-bottom-1732082832">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <div className="account__body">
          <h1 className="account__body--title">Compte</h1>
          <ul className="account__body--list">
            {accountItems.map((item, index) => (
              <li className="account__body--item" key={index}>
                <div>

                <span className="account__body--icon">
                  <item.icon />
                </span>
                <span className="account_body--info">{item.info}</span>
                </div>

                <button className="account__body--action">{item.action}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
