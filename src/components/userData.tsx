import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../store/store";

import { API } from "../config";
import { setCredentials } from "../slice/authSlice";
import axios from "axios";

const useUserData = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    const token = Cookies.get("token");
    const refreshToken = async () => {
      try {
        const response = await API.post("/auth/refresh", {});
        console.log(response.data);
        //   Cookies.set("token", response.data.accessToken); // Stocke le nouveau accessToken
        //   return response.data.accessToken;
      } catch (error) {
        console.error("Erreur lors du rafraîchissement du token", error);

        return null;
      }
    };
    if (token) {
        console.log("J'envoie la requete")
      // Envoie la requête uniquement si user est null
      const fetchUserData = async () => {
        try {
          const response = await API.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response)
          dispatch(setCredentials(response.data));
        } catch (error) {

            if (error instanceof axios.AxiosError && error.response?.status === 401) {
                // Maintenant, TypeScript sait que `error` est une erreur Axios
                const newToken = await refreshToken();
                console.log("J'entre ici");
                console.log(newToken);
                // … ton code
              } else {
                console.error(
                  "Erreur lors de la récupération des données de l'utilisateur",
                  error
                );
              }
        }
      };

      fetchUserData();
    }
  }, [dispatch, user]);
};

export default useUserData;
