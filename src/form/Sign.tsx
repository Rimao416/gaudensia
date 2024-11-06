import React from "react";
import Button from "../components/Button";

function Sign() {
  return (
    <>
      <h1 className="overlay__title">Connexion</h1>
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
          <span style={{ color: "#FF6060", cursor: "pointer" }}>
            S'enregistrer
          </span>
        </p>
      </form>
    </>
  );
}

export default Sign;
