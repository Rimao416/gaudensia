import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../store/store";
import { API } from "../config";
import { setCredentials } from "../slice/authSlice";
import { AxiosError } from "axios";

// Fonction pour rafraîchir le token
export const refreshToken = async () => {
  try {
    // Envoi de la requête pour rafraîchir le token
    const response = await API.post("/auth/refresh");
    return response.data.accessToken; // Retour du nouvel accessToken
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    return null;
  }
};

const useUserData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (accessToken) {
          // Utilisation de l'accessToken pour récupérer les données utilisateur
          const response = await API.get("/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          dispatch(setCredentials(response.data));
        }
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          console.log("Rafraîchissement de l'access token");
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            // Mise à jour du token dans le cookie et en mémoire
            Cookies.set("accessToken", newAccessToken, { expires: 1 / 24 }); // Le cookie expire après 1 heure
            setAccessToken(newAccessToken);
            // Relancer la requête après le rafraîchissement
            const retryResponse = await API.get("/user", {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
            dispatch(setCredentials(retryResponse.data));
          } else {
            console.error("Échec du rafraîchissement du token");
          }
        }
      }
    };

    // Vérification initiale du token et de l'utilisateur
    if (accessToken && !user) {
      fetchUserData();
    }
  }, [accessToken, dispatch, user]); // Dépendances pour recharger si token ou utilisateur changent

  useEffect(() => {
    // Initialisation de l'accessToken depuis le cookie lors du premier rendu
    const initialToken = Cookies.get("accessToken");
    if (initialToken) {
      setAccessToken(initialToken);
    }
  }, []); // Se déclenche uniquement au premier rendu

  return { accessToken }; // Retourner l'accessToken si nécessaire
};

export default useUserData;
