import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  getEmailValidationSchema,
  getFullNameValidationSchema,
  getPasswordValidationSchema,
} from "../constants/validate";
import { setErrors, useUpdateUserMutation } from "../slice/authSlice";
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
    newPassword: "",
    confirmPassword: "",
  });

  const [updateUser] = useUpdateUserMutation();
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
        const validation = getFullNameValidationSchema().validate(
          { fullName: credentials.fullName }, // Passer un objet avec `email`
          {
            abortEarly: false,
          }
        );
        error = validation.error || null;
        break;
      }
      case "password": {
        const validation = getPasswordValidationSchema().validate(
          {
            password: credentials.password,
            newPassword: credentials.newPassword,
            confirmPassword: credentials.confirmPassword,
          },
          { abortEarly: false }
        );
        error = validation.error || null;

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
    const value = e.target.value;

    // Mettre à jour les valeurs des credentials
    setCredentials({ ...credentials, [field]: value });

    // Effacer l'erreur pour ce champ dans le store Redux
    if (errors && errors[field]) {
      dispatch(
        setErrors({
          ...errors,
          [field]: null, // Effacer l'erreur pour ce champ
        })
      );
    }

    // Afficher une erreur temporaire si nécessaire
    setShowErrors({
      ...showErrors,
      [field]: true, // Gère l'affichage local des erreurs
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      switch (type) {
        case "email": {
          const response = await updateUser({
            email: credentials.email,
          }).unwrap();
          console.log(response);
          break;
        }
        case "fullName": {
          const response = await updateUser({
            fullName: credentials.fullName,
          }).unwrap();
          console.log(response);
          break;
        }
        case "password":
          console.log(credentials);
          break;
        case "phoneNumber":
          await updateUser({ phoneNumber: credentials.phoneNumber });
          break;
        default:
      }
    }
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
                Mot de passe actuel
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nouveau mot de passe"
                className={`overlay__input ${
                  errors && errors.password ? "input-error" : ""
                }`}
                name="password"
                onChange={handleChange}
              />
              {errors && errors.password && (
                <p className="error-text">{errors && errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="newPassword" className="overlay__label">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Nouveau mot de passe"
                className={`overlay__input ${
                  errors && errors.newPassword ? "input-error" : ""
                }`}
                name="newPassword"
                onChange={handleChange}
              />
              {errors && errors.newPassword && (
                <p className="error-text">{errors && errors.newPassword}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="overlay__label">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirmer le mot de passe"
                className={`overlay__input ${
                  errors && errors.confirmPassword ? "input-error" : ""
                }`}
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors && errors.confirmPassword && (
                <p className="error-text">{errors && errors.confirmPassword}</p>
              )}
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
