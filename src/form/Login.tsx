import { useState } from "react";
import { IoClose } from "react-icons/io5";


import { useAppDispatch } from "../store/store";
import { login } from "../slice/authSlice";
import { useMessages } from "../context/useMessage";
import { useAuthOverlay } from "../context/useAuthOverlay";
function Login() {
  const dispatch = useAppDispatch();
  const { setAuthOverlayVisible } = useAuthOverlay();
  const { setMessage } = useMessages();
  const { setType, type } = useAuthOverlay();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response=await dispatch(login(credentials));
    if(login.fulfilled.match(response)) {
      setMessage("Utilisateur connecté avec succès", "success");
      setAuthOverlayVisible(false);
      
    }
  };

  return (
    <>
    <div className="overlay__close" onClick={()=>setAuthOverlayVisible(false)}>
      <span><IoClose /></span>
    </div>
      <h1 className="overlay__title" onClick={() => setType("sign")}>
        Connexion
      </h1>
      <p className="overlay__text">Commnencez à vous connecter</p>
      <form className="overlay__form" onSubmit={handleSubmit}>
        <input
          type="mail"
          placeholder="E-mail"
          className="overlay__input"
          defaultValue={credentials.email}

          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="overlay__input"
          name="password"
          defaultValue={credentials.password}
          onChange={handleChange}
        />
        <p className="overlay__info">
          Créer un compte vous permet de commander plus rapidement,
          d'enregistrer plusieurs adresses, de suivre vos commandes et bien plus
          encore ; connectez-vous dès maintenant pour accéder à ces avantages.
        </p>
        <button type="submit" className="button button__outline">
          Se connecter
        </button>
        <p className="overlay__text">
          Vous n'avez pas de compte ?{" "}
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut du lien
              setType("sign");
              console.log(type);
            }}
          >
            S'enregistrer
          </span>
        </p>
      </form>
    </>
  );
}

export default Login;
