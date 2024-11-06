import { useState } from "react";
import Button from "../components/Button";

import PhoneInput from "react-phone-number-input";
function Sign() {
  const [adress, setAdress] = useState("");
  const handleGetCurrentLocation = () => {
    // Vérifier si la géolocalisation est disponible dans le navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Utiliser un service de géocodage inverse pour obtenir l'adresse
          const geocodeAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await fetch(geocodeAPI);
            const data = await response.json();
            const userAddress = data.display_name; // Adresse complète retournée par le service
            setAdress(userAddress); // Met à jour l'état avec l'adresse
          } catch (error) {
            console.error(
              "Erreur lors de la récupération de l'adresse:",
              error
            );
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible de récupérer votre position.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };
  return (
    <>
      <h1 className="overlay__title">Inscription</h1>
      <p className="overlay__text">Bienvenue chez Gaudensia</p>
      <form className="overlay__form">
        <input
          type="text"
          placeholder="Nom Complet"
          className="overlay__input"
        />
        <input type="mail" placeholder="E-mail" className="overlay__input" />
        <input
          type="text"
          placeholder="Adresse"
          className="overlay__input"
          value={adress}
          onChange={(e) => setAdress(e.target.value)} // Permet à l'utilisateur de modifier l'adresse manuellement
        />
        <p
          style={{
            cursor: "pointer",
            color: "blue",
            textAlign: "left",
            fontSize: "12px",
          }}
          onClick={handleGetCurrentLocation}
        >
          Utiliser ma position actuelle
        </p>
        <input
          type="password"
          placeholder="Mot de passe"
          className="overlay__input"
        />
        <PhoneInput
          placeholder="N° Telephone"
          className="overlay__input"
          onChange={(value) => console.log(value)}
          
        />
        <p className="overlay__info">
          Créer un compte vous permet de commander plus rapidement,
          d'enregistrer plusieurs adresses, de suivre vos commandes et bien plus
          encore ; connectez-vous dès maintenant pour accéder à ces avantages.
        </p>
        <Button
          type="outline"
          genre="submit"
          onClick={() => console.log("SALUT LES AMIS")}
        >
          Connexion
        </Button>
        <p className="overlay__text">
          Vous n'avez pas de compte ?{" "}
          <span style={{ color: "#FF6060", cursor: "pointer" }}>
            S'enregistrer
          </span>
        </p>
      </form>
    </>
  );
}

export default Sign;
