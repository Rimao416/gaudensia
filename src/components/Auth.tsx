import { useAuthOverlay } from "../context/useAuthOverlay";
import { useResize } from "../context/useResize";
import Login from "../form/Login";
import Sign from "../form/Sign";
import ModalLayout from "../layouts/ModalLayout";
import BottomSheet from "./BottomSheet";
import { useState, useEffect } from "react";

function Auth() {
  const { isAuthOverlayVisible, type } = useAuthOverlay();
  const isMobile = useResize(); // Utiliser le hook pour détecter si c'est mobile
  const [isSheetOpen, setSheetOpen] = useState(isAuthOverlayVisible);

  // Fonction pour fermer le BottomSheet
  const handleBottomSheetClose = () => {
    setSheetOpen(false);
  };

  // Mettre à jour l'état de BottomSheet à chaque changement de l'overlay
  useEffect(() => {
    setSheetOpen(isAuthOverlayVisible);
  }, [isAuthOverlayVisible]);

  // Rendu du contenu (Login ou Sign)
  const content = type === "login" ? <Login /> : <Sign />; 

  return (
    <>
      {/* Si l'utilisateur est sur mobile, afficher un BottomSheet */}
      {isMobile ? (
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={handleBottomSheetClose}
          snapPoints={[600, 400, 200, 0]}
          initialSnap={1}
          draggableAt="both"
          paddingBottom={50}
        >
          {content}
        </BottomSheet>
      ) : (
        // Sinon, afficher un modal classique pour les autres tailles d'écran
        <ModalLayout type="center">
          {content}
        </ModalLayout>
      )}
    </>
  );
}

export default Auth;
