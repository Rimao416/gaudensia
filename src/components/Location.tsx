import React, { useState } from "react";
import LineWaveSpinner from "./LineWaveSpinenr";

interface GetCurrentLocationProps {
  onLocationRetrieved: (address: string) => void; // Callback pour retourner l'adresse
}

const GetCurrentLocation: React.FC<GetCurrentLocationProps> = ({
  onLocationRetrieved,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const geocodeAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const response = await fetch(geocodeAPI);
          const data = await response.json();
          const userAddress = data.display_name;

          onLocationRetrieved(userAddress); // Retourne l'adresse via le callback
        } catch (error) {
          console.error("Erreur lors de la récupération de l'adresse:", error);
          alert("Impossible de récupérer l'adresse.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation:", error);
        alert("Impossible de récupérer votre position.");
        setLoading(false);
      }
    );
  };

  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <p
        style={{
          color: "#00A082",
          fontSize: "12px",
          textAlign: "left",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={handleClick}
      >
        Utiliser ma position
      </p>
      <LineWaveSpinner visible={loading}/>
    </div>
  );
};

export default GetCurrentLocation;
