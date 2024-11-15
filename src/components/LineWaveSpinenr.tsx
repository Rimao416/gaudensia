// LineWaveSpinner.tsx
import React from "react";

interface LineWaveSpinnerProps {
  visible: boolean;
  size?: number;  // Taille du spinner, par défaut 60px
  color?: string; // Couleur des lignes, par défaut #4fa94d
}

const LineWaveSpinner: React.FC<LineWaveSpinnerProps> = ({
  visible,
  size = 4,
  color = "#00A082",
}) => {
  if (!visible) return null; // Si visible est false, ne rien afficher

  return (
    <div className="line-wave-container">
    <div className="line-wave" style={{ height: `${size * 5}px`, width: `${size}px`, backgroundColor: color }}></div>
    <div className="line-wave" style={{ height: `${size * 5}px`, width: `${size}px`, backgroundColor: color }}></div>
    <div className="line-wave" style={{ height: `${size * 5}px`, width: `${size}px`, backgroundColor: color }}></div>
  </div>
  );
};

export default LineWaveSpinner;
