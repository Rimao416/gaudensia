import { useMessages } from "../context/useMessage";
import { setAllergies as setAll } from "../slice/cartSlice";
import { useAppDispatch } from "../store/store";
import Modal from "./Modal";
import { useState } from "react";
interface OrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function AllergiaModal({ isModalOpen, setIsModalOpen }: OrderModalProps) {
  const dispatch = useAppDispatch();
  const { setMessage } = useMessages();
  const [allergies, setAllergies] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    if (value.trim() !== "") {
      setAllergies(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (allergies.trim() !== "") {
      // Si le champ n'est pas vide, vous pouvez faire quelque chose avec `allergies`
    setMessage("Allergies enregistrées", "success");
      setIsModalOpen(false); // Ferme le modal après l'envoi
      await dispatch(setAll(allergies));
    } else {
      setIsModalOpen(false);
      // Affichez un message d'erreur ou ne faites rien si le champ est vide
      setMessage("Veuillez entrer des allergies", "warning");
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <form className="allergia" onSubmit={handleSubmit}>
        <h2>Des allergies ?</h2>
        <textarea
          name="allergies"
          id=""
          cols={30}
          rows={10}
          onChange={(e) => handleChange(e.target.value)}
          value={allergies} // Pour lier l'état avec le champ de texte
        ></textarea>

        <button
          type="submit"
          className="button button__outline"
          style={{ marginTop: "24px", width: "100%" }}
        >
          Envoyer
        </button>
      </form>
    </Modal>
  );
}

export default AllergiaModal;
