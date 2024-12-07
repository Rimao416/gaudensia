import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Joi from "joi";

// import { useAppDispatch, useAppSelector } from "../store/store";
import { useSignUpMutation } from "../slice/authSlice";
// import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
import { IoClose } from "react-icons/io5";

import GetCurrentLocation from "../components/Location";
import { useTranslation } from "react-i18next";

function Sign() {
  const {t}=useTranslation()
  // const { setMessage } = useMessages();
  // const dispatch = useAppDispatch();
  const { setAuthOverlayVisible, setType } = useAuthOverlay();

  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const [signUp] = useSignUpMutation(); // Appel du hook useSignUpMutation

  const validationSchema = Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[A-Za-z\s]+$/)
      .required(),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),

    password: Joi.string()
      .min(6)
      .max(30)
      .required(),

    address: Joi.string()
      .allow("")
      .max(100)
      .optional(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, phoneNumber, password, address } = credentials;
    const { error } = validationSchema.validate(
      { fullName, email, phoneNumber, password, address },
      { abortEarly: false }
    );

    if (!error) {
      // const response = await signUp(credentials); // Utilisation de la mutation signUp
      // if (signUp.fulfilled.match(response)) {
      //   setMessage("Utilisateur enregistré avec succès", "success");
      //   setAuthOverlayVisible(false);
      // }
    }
  };

  const handleLocationRetrieved = (address: string) => {
    setCredentials((prev) => ({ ...prev, address }));
  };

  return (
    <>
      <div
        className="overlay__close"
        onClick={() => setAuthOverlayVisible(false)}
      >
        <span>
          <IoClose />
        </span>
      </div>
      <h1 className="overlay__title">{t("sign")}</h1>
      <p className="overlay__text">{t("signMessage")}</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom Complet"
            name="fullName"
            className="overlay__input"
            value={credentials.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            className="overlay__input"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Adresse"
            name="address"
            className="overlay__input"
            value={credentials.address}
            onChange={handleChange}
          />
          <GetCurrentLocation onLocationRetrieved={handleLocationRetrieved} />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="overlay__input"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <PhoneInput
            placeholder="N° Telephone"
            className="overlay__input"
            value={credentials.phoneNumber}
            onChange={(value) =>
              setCredentials((prev) => ({ ...prev, phoneNumber: value as string }))
            }
          />
        </div>

        <button type="submit" className="button button__outline">
          {t("signButton")}
        </button>
        <p className="overlay__text">
          {t("signAlert")}{" "}
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              setType("login");
            }}
          >
            {t("signAlternate")}
          </span>
        </p>
      </form>
    </>
  );
}

export default Sign;
