import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Joi from "joi";
import { useLoginMutation } from "../slice/authSlice";

function Login() {
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
  const [login, { isLoading }] = useLoginMutation(); // Utilisation du hook `useLoginMutation`
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const handleValidation = () => {
    const { error } = validationSchema.validate(credentials, {
      abortEarly: false,
    });
    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setValidationErrors(newErrors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Supprimer l'erreur pour ce champ s'il y en a une
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handleValidation()) return;

    try {
      const response = await login(credentials).unwrap(); // Effectuer la mutation avec `unwrap`
      // Connexion réussie
      console.log("Connexion réussie", response);
    } catch (err) {
      // Échec de la connexion (par exemple, mauvaise combinaison email/mot de passe)
      console.error("Erreur de connexion", err);
    }
  };

  return (
    <>
      <div
        className="overlay__close"
        onClick={() => console.log("Fermer l'overlay")}
      >
        <IoClose />
      </div>
      <h1 className="overlay__title">Connexion</h1>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            className={`overlay__input ${
              validationErrors.email ? "input-error" : ""
            }`}
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="error-text">{validationErrors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            className={`overlay__input ${
              validationErrors.password ? "input-error" : ""
            }`}
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="error-text">{validationErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="button button__outline"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      {/* {isError && <p className="error-text">{error?.message || "Erreur lors de la connexion"}</p>} */}
    </>
  );
}

export default Login;
