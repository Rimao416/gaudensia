import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getEmailValidationSchema } from "../constants/validate";
import { setErrors } from "../slice/authSlice";
import Joi from "joi";

interface UpdateModalProps {
  onClose: () => void;
  headerTitle: string;
  info: string;
  type: string;
}

const UpdateModal = ({
  onClose,
  headerTitle,
  info,
  type,
}: UpdateModalProps) => {
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<{ [key: string]: string }>({
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
  });
  const { errors } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const timers = Object.keys(showErrors).map((key) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [key]: false }));
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [showErrors]);

  const handleValidation = () => {
    let error: Joi.ValidationError | null = null;

    switch (type) {
      case "email": {
        const validation = getEmailValidationSchema().validate(
          { email: credentials.email }, // Passer un objet avec `email`
          {
            abortEarly: false,
          }
        );
        error = validation.error || null;
        break;
      }
      case "fullName": {
        // Ajouter la validation du nom complet si nécessaire
        break;
      }
      case "password": {
        // Ajouter la validation du mot de passe si nécessaire
        break;
      }
      case "phoneNumber": {
        // Ajouter la validation du numéro de téléphone si nécessaire
        break;
      }
      default:
        break;
    }

    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((detail) => {
        const fieldName = detail.path[0].toString();
        newErrors[fieldName] = detail.message;
      });
      dispatch(setErrors(newErrors));
      return false; // Validation échouée
    }

    return true; // Validation réussie
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    setCredentials({ ...credentials, [field]: e.target.value });
    console.log(errors[field])
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
    console.log(errors);
    console.log(handleValidation());
    console.log(credentials)
  };

  const renderForm = () => {
    switch (type) {
      case "email":
        return (
          <form className="overlay__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="overlay__label">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`overlay__input ${
                  errors && errors.email ? "input-error" : ""
                }`}
                defaultValue={info}
                name="email"
                onChange={handleChange}
              />
              {errors && errors.email && (
                <p className="error-text">{errors && errors.email}</p>
              )}
            </div>
            <button type="submit" className="button button__outline">
              Mettre à jour
            </button>
          </form>
        );
      case "fullName":
        return (
          <form className="overlay__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="overlay__label">
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nom complet"
                className="overlay__input"
                defaultValue={info}
                name="fullName"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button button__outline">
              Mettre à jour
            </button>
          </form>
        );
      case "password":
        return (
          <form className="overlay__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="overlay__label">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Nouveau mot de passe"
                className="overlay__input"
                name="newPassword"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="overlay__label">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmer le mot de passe"
                className="overlay__input"
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button button__outline">
              Mettre à jour
            </button>
          </form>
        );
      case "phoneNumber":
        return (
          <form className="overlay__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phoneNumber" className="overlay__label">
                Numéro de téléphone
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Numéro de téléphone"
                className="overlay__input"
                defaultValue={info}
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button button__outline">
              Mettre à jour
            </button>
          </form>
        );
      default:
        return <p>Type de formulaire inconnu</p>;
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h3>{headerTitle}</h3>
      <div>{renderForm()}</div>
    </Modal>
  );
};

export default UpdateModal;
