import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import Joi from "joi";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCredentials, setErrors } from "../slice/authSlice";

// Schéma de validation
const validationSchema = Joi.object({
  fullName: Joi.string().min(3).required().messages({
    "string.empty": "Le nom complet est requis",
    "string.min": "Le nom complet doit comporter au moins 3 caractères",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email invalide",
      "string.empty": "L'email est requis",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Numéro de téléphone invalide",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Le mot de passe est requis",
    "string.min": "Le mot de passe doit comporter au moins 6 caractères",
  }),
  address: Joi.string().allow("").optional(),
});

function Sign() {
  const dispatch = useAppDispatch();
  const { fullName, email, phoneNumber, password, address } =
    useAppSelector((state) => state.auth.user) ?? {};
  const { errors } = useAppSelector((state) => state.auth);

  //   const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});

  const handleValidation = () => {
    const { error } = validationSchema.validate(
      { fullName, email, phoneNumber, password, address },
      { abortEarly: false }
    );

    if (error) {
      const newErrors: { [key: string]: string | null } = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      dispatch(setErrors(newErrors));
      return false;
    }

    dispatch(setErrors({}));
    return true;
  };

  const handleChange = (field: string, value: string) => {
    dispatch(setCredentials({ [field]: value }));
    if (errors && errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
      setShowErrors({
        ...showErrors,
        [field]: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Données soumises :", {
        fullName,
        email,
        phoneNumber,
        password,
        address,
      });
    }
  };

  useEffect(() => {
    const timers = Object.keys(showErrors).map((key) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [key]: false }));
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [showErrors]);

  return (
    <>
      <h1 className="overlay__title">Inscription</h1>
      <p className="overlay__text">Bienvenue chez Gaudensia</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom Complet"
            className={`overlay__input ${
              errors && errors.fullName ? "input-error" : ""
            }`}
            defaultValue={fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          {errors && errors.fullName && (
            <p className="error-text">{errors && errors.fullName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            className={`overlay__input ${
              errors && errors.email ? "input-error" : ""
            }`}
            defaultValue={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors && errors.email && (
            <p className="error-text">{errors && errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Adresse"
            className="overlay__input"
            defaultValue={address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <p
            style={{ color: "blue", fontSize: "12px", textAlign: "left" }}
            onClick={() =>
              navigator.geolocation.getCurrentPosition((position) =>
                handleChange(
                  "address",
                  `${position.coords.latitude}, ${position.coords.longitude}`
                )
              )
            }
          >
            Utiliser ma position{" "}
          </p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            className={`overlay__input ${
              errors && errors.password ? "input-error" : ""
            }`}
            defaultValue={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors && errors.password && (
            <p className="error-text">{errors && errors.password}</p>
          )}
        </div>
        <div>
          <PhoneInput
            placeholder="N° Telephone"
            className={`overlay__input ${
              errors && errors.phoneNumber ? "input-error" : ""
            }`}
            value={phoneNumber}
            onChange={(value) => handleChange("phoneNumber", value as string)}
          />
          {errors && errors.phoneNumber && (
            <p className="error-text">{errors && errors.phoneNumber}</p>
          )}
        </div>

        <button type="submit" className="button button__outline">
          S'enregistrer
        </button>
      </form>
    </>
  );
}

export default Sign;
