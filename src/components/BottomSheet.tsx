import React, { ReactNode } from "react";
import { Sheet } from "react-modal-sheet";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: number[];
  initialSnap?: number;
  children: ReactNode;
  draggableAt?: "top" | "bottom" | "both";
  paddingBottom?: number; // Permet de définir un padding bas depuis le composant parent
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  snapPoints = [600, 400, 100, 0],
  initialSnap = 1,
  children,
  draggableAt = "both",
  paddingBottom = 0, // Valeur par défaut de padding à 0
}) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={{ paddingBottom: `${paddingBottom}px` }}>
          <Sheet.Scroller draggableAt={draggableAt}>
            {children}
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default BottomSheet;
