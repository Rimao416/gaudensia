import React, { ReactNode } from "react";
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
  snapPoints = [400], // Moins de snap points pour améliorer les performances
  initialSnap = 0,
  children,
  draggableAt = "top",
  paddingBottom = 0,
}) => {


  // const handleSnap = (index: number) => {
  //   if (index === snapPoints.length - 1) { // Si la position finale est la dernière (ex: 0)
  //     onClose(); // Ferme la feuille et met `isOpen` à false
  //   }
  // };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      // onSnap={handleSnap} // Correction : utilisation de `onSnap` au lieu de `onSnapEnd`
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content
          style={{
            paddingBottom: `${paddingBottom}px`,
            paddingRight: "20px",
            paddingLeft: "20px",
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
