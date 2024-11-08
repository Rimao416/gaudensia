import { FaCheck, FaUser } from "react-icons/fa6";

interface UserProps {
  user: { fullName: string } | null;
  isScrolled: boolean;
  authModalOpen?: () => void; // Fonction à appeler quand l'utilisateur n'est pas connecté
}

const UserDisplay: React.FC<UserProps> = ({
  user,
  isScrolled,
  authModalOpen,
}) => {
  return (
    <div className="navigation__user" onClick={user ? undefined : authModalOpen}>
      <span className="navigation__login">
        {user && (
          <span className="navigation__login--true">
            <FaCheck />
          </span>
        )}
        <span
          className={`navigation__login--wrapper ${isScrolled ? "active" : ""}`}
        >
          <FaUser />
        </span>
      </span>
      <p
        className={`${isScrolled ? "active" : ""}`}
         // Appelle authModalOpen si non connecté
      >
        {user ? "Mon Compte" : "Connexion"}
      </p>
    </div>
  );
};

export default UserDisplay;
