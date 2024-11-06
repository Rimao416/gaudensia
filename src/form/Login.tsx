

import Button from "../components/Button";
import { useAuthOverlay } from "../context/useAuthOverlay";

function Login() {
  const { setType, type } = useAuthOverlay();

  return (
    <>
      <h1 className="overlay__title" onClick={() => setType("sign")}>Connexion</h1>
      <p className="overlay__text">Commnencez à vous connecter</p>
      <form className="overlay__form">
        <input type="mail" placeholder="E-mail" className="overlay__input" />
        <input
          type="password"
          placeholder="Mot de passe"
          className="overlay__input"
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
          <span
            style={{ color: "#FF6060", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault(); // Prévenir le comportement par défaut du lien
              setType("sign");
              console.log(type)
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
