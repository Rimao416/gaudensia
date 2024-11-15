import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import Joi from "joi";

import { useAppDispatch, useAppSelector } from "../store/store";
import { setErrors, sign } from "../slice/authSlice";
import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
import { IoClose } from "react-icons/io5";
import { user } from "../interface/user";
import LoadingSpinner from "../constants/loader";
import LineWaveSpinner from "../components/LineWaveSpinenr";
// Schéma de validation

function Sign() {
  const [loadingAddress, setLoadingAddress] = useState(false);

  const { setMessage } = useMessages();
  const dispatch = useAppDispatch();
  const { setAuthOverlayVisible, setType, type } = useAuthOverlay();

  const { errors } = useAppSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({

    fullName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",

  });

  const validationSchema = Joi.object({
    fullName: Joi.string()
      .min(3)
      .max(50) // Limite supérieure pour éviter les noms excessivement longs
      .pattern(/^[A-Za-z\s]+$/) // Autorise uniquement les lettres et les espaces
      .required()
      .messages({
        "string.empty": "Le nom complet est requis",
        "string.min": "Le nom complet doit comporter au moins 3 caractères",
        "string.max": "Le nom complet ne doit pas dépasser 50 caractères",
        "string.pattern.base":
          "Le nom complet ne doit contenir que des lettres et des espaces",
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } }) // Vérifie les domaines de premier niveau valides
      .required()
      .messages({
        "string.email": "L'adresse e-mail est invalide",
        "string.empty": "L'adresse e-mail est requise",
      }),

    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/) // Valide les numéros de téléphone au format E.164
      .required()
      .messages({
        "string.empty": "Le numéro de téléphone est requis",
        "string.pattern.base":
          "Le numéro de téléphone est invalide. Utilisez un format valide (ex: +33612345678)",
      }),

    password: Joi.string()
      .min(6)
      .max(30) // Longueur maximale pour plus de sécurité
      .required()
      .messages({
        "string.empty": "Le mot de passe est requis",
        "string.min": "Le mot de passe doit comporter au moins 6 caractères",
        "string.max": "Le mot de passe ne doit pas dépasser 30 caractères",
      }),

    address: Joi.string()
      .allow("") // Optionnel, peut être vide
      .max(100) // Limite pour éviter des adresses trop longues
      .optional()
      .messages({
        "string.max": "L'adresse ne doit pas dépasser 100 caractères",
      }),
  });

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

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingAddress(true); // Mettre à jour l'état de chargement

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const geocodeAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await fetch(geocodeAPI);
            const data = await response.json();
            const userAddress = data.display_name;

            setCredentials((prev) => ({ ...prev, address: userAddress }));
          } catch (error) {
            console.error(
              "Erreur lors de la récupération de l'adresse:",
              error
            );
          } finally {
            setLoadingAddress(false); // Réinitialiser l'état de chargement
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible de récupérer votre position.");
          setLoadingAddress(false); // Réinitialiser l'état de chargement en cas d'erreur
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoadingAddress(false); // Réinitialiser l'état de chargement si la géolocalisation est non supportée
    }
  };

  //   const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});

  const handleValidation = () => {
    const { fullName, email, phoneNumber, password, address } = credentials;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(credentials)
    e.preventDefault();
    if (handleValidation()) {
      const response = await dispatch(sign(credentials));
      if (sign.fulfilled.match(response)) {
        setMessage("Utilisateur enregistré avec succès", "success");
        setAuthOverlayVisible(false);
        // Cookies.set("token", response.payload.token);
      }
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
      <div
        className="overlay__close"
        onClick={() => setAuthOverlayVisible(false)}
      >
        <span>
          <IoClose />
        </span>
      </div>
      <h1 className="overlay__title">Inscription</h1>
      <p className="overlay__text">Bienvenue chez Gaudensia</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom Complet"
            name="fullName"
            className={`overlay__input ${
              errors && errors.fullName ? "input-error" : ""
            }`}
            defaultValue={credentials.fullName}
            onChange={handleChange}
          />
          {errors && errors.fullName && (
            <p className="error-text">{errors && errors.fullName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            className={`overlay__input ${
              errors && errors.email ? "input-error" : ""
            }`}
            defaultValue={credentials.email}
            onChange={handleChange}
          />
          {errors && errors.email && (
            <p className="error-text">{errors && errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Adresse"
            name="address"
            className="overlay__input"
            defaultValue={credentials.address}
            onChange={handleChange}
          />
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <p
            style={{
              color: "#00A082",
              fontSize: "12px",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={handleGetCurrentLocation}
          >
            Utiliser ma position{" "}
          </p>


          <LineWaveSpinner visible={loadingAddress}/>
        
          </div>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className={`overlay__input ${
              errors && errors.password ? "input-error" : ""
            }`}
            defaultValue={credentials.password}
            onChange={handleChange}
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
            value={credentials.phoneNumber}
            // setCredentials((prev) => ({ ...prev, address: userAddress }));
            onChange={(value) =>
              setCredentials((prev) => ({
                ...prev,
                phoneNumber: value as string,
              }))
            }
          />
          {errors && errors.phoneNumber && (
            <p className="error-text">{errors && errors.phoneNumber}</p>
          )}
        </div>

        <button type="submit" className="button button__outline">
          S'enregistrer
        </button>
        <p className="overlay__text">
          Vous avez déjà un compte ?{" "}
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut du lien
              setType("login");
              console.log(type);
            }}
          >
            Se connecter
          </span>
        </p>
      </form>
    </>
  );
}

export default Sign;
