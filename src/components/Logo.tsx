import { motion } from "framer-motion";


interface LogoProps {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  image: string;

  transition?: object; // Pour personnaliser les transitions
}

export default function ImageLogo({ top, left, bottom, right, image, transition }: LogoProps) {
    return (
      <motion.img
        src={image}
        alt="logo"
        style={{ top, left, bottom, right, position: "absolute" }}
        className="header__icon"
        initial={{ scale: 1 }} // État initial de l'échelle (peut être ajusté en fonction de l'animation)

        transition={transition} // Utiliser les transitions personnalisées
      />
    );
  }
  