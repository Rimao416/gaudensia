import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../store/store";
import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
import Joi from "joi";
import { setErrors, useLoginMutation } from "../slice/authSlice";

const validationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email invalide",
      "string.empty": "L'email est requis",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Le mot de passe est requis",
    "string.min": "Le mot de passe doit comporter au moins 6 caractères",
  }),
});
function Login() {
  const dispatch = useAppDispatch();
  const [login]=useLoginMutation();
  const { setAuthOverlayVisible } = useAuthOverlay();
  const { setMessage } = useMessages();
  const { setType, type } = useAuthOverlay();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});
  const { errors } = useAppSelector((state) => state.auth);
  console.log(errors)
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
    const { error } = validationSchema.validate(
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
      console.log(response);   
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
        Connexion
      </h1>
      <p className="overlay__text">Commnencez à vous connecter</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="mail"
            placeholder="E-mail"
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
            placeholder="Mot de passe"
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
        <p className="overlay__info">
          Créer un compte vous permet de commander plus rapidement,
          d'enregistrer plusieurs adresses, de suivre vos commandes et bien plus
          encore ; connectez-vous dès maintenant pour accéder à ces avantages.
        </p>
        <button type="submit" className="button button__outline">
          Se connecter
        </button>
        <p className="overlay__text">
          Vous n'avez pas de compte ?{" "}
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut du lien
              setType("sign");
              console.log(type);
            }}
          >
            S'enregistrer
          </span>
        </p>
      </form>
    </>
  );
}

export default Login;
