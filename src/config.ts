import axios from "axios"
import Cookies from "js-cookie"
import { useAppDispatch } from "./store/store";
import { setCredentials } from "./slice/authSlice";
export const assetsURL="http://localhost:5000/api/v1"
export const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });
// API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = Cookies.get("token"); // Utilisez votre cookie de refresh token

//         try {
//           const { data } = await axios.post(
//             assetsURL + "/auth/refresh",
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${refreshToken}`,
//               },
//             }
//           );
//           console.log(data)
          
//           // Mettez à jour le token dans le cookie
//           Cookies.set("token", data.newToken, {
//             httpOnly: true,
//             sameSite: "strict",
//           });
  
//           // Mettez à jour les credentials dans le store
//         //   useAppDispatch(setCredentials(data.user));
  
//           // Réessayez la requête d’origine avec le nouveau token
//           originalRequest.headers.Authorization = `Bearer ${data.newToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           // Si le refresh token échoue, l'utilisateur devra se reconnecter
//           console.error("Erreur lors du rafraîchissement du token:", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

