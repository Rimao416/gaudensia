import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../store/store";
import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
import Joi from "joi";
import { setErrors, useLoginMutation } from "../slice/authSlice";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const getValidationSchema = () => {
  return Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": i18n.t("validation.emailInvalid"),
        "string.empty": i18n.t("validation.emailRequired"),
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": i18n.t("validation.passwordRequired"),
        "string.min": i18n.t("validation.passwordMin"),
      }),
  });
};
function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { setAuthOverlayVisible } = useAuthOverlay();
  const { setMessage } = useMessages();
  const { setType, type } = useAuthOverlay();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});
  const { errors } = useAppSelector((state) => state.auth);
  console.log(errors);
  useEffect(() => {
    const timers = Object.keys(showErrors).map((key) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [key]: false }));
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [showErrors]);
  const handleValidation = () => {
    const { email, password } = credentials; // Récupérer les valeurs de l'état credentials
    const { error } = getValidationSchema().validate(
      { email, password }, // Utiliser les variables de l'état
      { abortEarly: false }
    );
    if (error) {
      const newErrors: { [key: string]: string | null } = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      dispatch(setErrors(newErrors));
      return false; // Validation échouée
    }
    return true; // Validation réussie
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name; // Déclarer 'field' à partir de e.target.name
console.log(errors)
    setCredentials({ ...credentials, [field]: e.target.value });

    // Vérifier et supprimer l'erreur associée au champ
    if (errors && errors[field]) {
      setErrors({
        ...errors,
        [field]: null, // Effacer l'erreur pour ce champ
      });

      // Afficher les erreurs après validation
      setShowErrors({
        ...showErrors,
        [field]: true, // Afficher l'erreur pour ce champ spécifique
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      const response = await login(credentials).unwrap(); // Utilisation de la mutation signUp
      if (response) {
        setMessage("Connexion reussie", "success");
      } // if(login.fulfilled.match(response)){
      //   setMessage("Connexion reussie", "success");
      //   setAuthOverlayVisible(false);
      // }
    }
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
      <h1 className="overlay__title" onClick={() => setType("sign")}>
        {t("Connexion")}
      </h1>
      <p className="overlay__text">{t("loginMessage")}</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="mail"
            placeholder={t("placeholderEmail")}
            className={`overlay__input ${
              errors && errors.email ? "input-error" : ""
            }`}
            defaultValue={credentials.email}
            name="email"
            onChange={handleChange}
          />
          {errors && errors.email && (
            <p className="error-text">{errors && errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder={t("placeholderPassword")}
            className={`overlay__input ${
              errors && errors.password ? "input-error" : ""
            }`}
            name="password"
            defaultValue={credentials.password}
            onChange={handleChange}
          />
          {errors && errors.password && (
            <p className="error-text">{errors && errors.password}</p>
          )}
        </div>
        <p className="overlay__info">{t("loginDescription")}</p>
        <button type="submit" className="button button__outline">
          {t("loginButton")}
        </button>
        <p className="overlay__text">
          {t("loginAlert")}{" "}
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut du lien
              setType("sign");
              console.log(type);
            }}
          >
            {t("loginAlternate")}
          </span>
        </p>
      </form>
    </>
  );
}

export default Login;
