import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Assurez-vous que le chemin d'importation du composant Modal est correct.
import Joi from "joi";
import {  setErrors, setLocation } from "../slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import GetCurrentLocation from "./Location";
import {  useNavigate } from "react-router-dom";
interface OrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function OrderModal({ isModalOpen, setIsModalOpen }: OrderModalProps) {
  const navigate=useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [credentials, setCredentials] = useState({
    deliveryAddress: "",
    deliveryDetails: "",
  });
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.cart);
  const [showErrors, setShowErrors] = useState<{ [key: string]: boolean }>({});
  const validationSchema = Joi.object({
    deliveryAddress: Joi.string().required().messages({
      "string.empty": "L'adresse de livraison est requise",
    }),
    deliveryDetails: Joi.string().required().messages({
      "string.empty": "Les détails de livraison sont requis",
    }),
  });

  useEffect(() => {
    const timers = Object.keys(showErrors).map((key) =>
      setTimeout(() => {
        setShowErrors((prev) => ({ ...prev, [key]: false }));
      }, 5000)
    );

    return () => timers.forEach(clearTimeout);
  }, [showErrors]);
  useEffect(() => {
    setCredentials((prev) => ({
      ...prev,
      deliveryAddress: user?.address || "", // Fournir une valeur par défaut vide
    }));
  }, [user]);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleValidation = () => {
    const { deliveryAddress, deliveryDetails } = credentials; // Récupérer les valeurs de l'état credentials
    const { error } = validationSchema.validate(
      { deliveryAddress, deliveryDetails }, // Utiliser les variables de l'état
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
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials)

    if (handleValidation()) {
      const response=await dispatch(setLocation(credentials));
      console.log(response)
      if(response)
      navigate("/checkout", { replace: true }); // Remplace l'entrée actuelle dans l'historique
    }
  };
  const handleLocationRetrieved = (address: string) => {
    setCredentials((prev) => ({ ...prev, deliveryAddress: address }));
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <div style={{ padding: "20px" }}>
        <h1 className="overlay__title">Détails de livraison</h1>
        <form className="overlay__form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Adresse de livraison"
              className={`overlay__input ${
                errors && errors.deliveryAddress ? "input-error" : ""
              }`}
              defaultValue={credentials.deliveryAddress}
              name="deliveryAddress"
              onChange={handleChange}
            />
            <GetCurrentLocation onLocationRetrieved={handleLocationRetrieved} />
            {errors && errors.deliveryAddress && (
              <p className="error-text">{errors && errors.deliveryAddress}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Détails de livraison ex : Rue de la paix 12"
              className={`overlay__input ${
                errors && errors.deliveryDetails ? "input-error" : ""
              }`}
              name="deliveryDetails"
              defaultValue={credentials.deliveryDetails}
              onChange={handleChange}
            />
            {errors && errors.deliveryDetails && (
              <p className="error-text">{errors && errors.deliveryDetails}</p>
            )}
          </div>

          <button type="submit" className="button button__outline">
            Confirmer
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default OrderModal;
