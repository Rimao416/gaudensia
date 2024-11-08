import React, { ReactNode, useEffect } from "react";
import { Sheet } from "react-modal-sheet";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: number[];
  initialSnap?: number;
  children: ReactNode;
  draggableAt?: "top" | "bottom" | "both";
  paddingBottom?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = React.memo(({
  isOpen,
  onClose,
  snapPoints = [400, 0], // Moins de snap points pour améliorer les performances
  initialSnap = 0,
  children,
  draggableAt = "both",
  paddingBottom = 0,
}) => {
  useEffect(() => {
    if (isOpen) {
      console.log("BottomSheet ouvert");
      // Effectuer des tâches spécifiques lors de l'ouverture, si nécessaire
    }
  }, [isOpen]);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content
          style={{
            paddingBottom: `${paddingBottom}px`,
            willChange: "transform, opacity", // Accélération matérielle
          }}
        >
          <Sheet.Scroller draggableAt={draggableAt}>
            {children}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
});

export default BottomSheet;
