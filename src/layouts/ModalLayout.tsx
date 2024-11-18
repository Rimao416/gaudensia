interface ModalLayoutProps {
  children: React.ReactNode;
  type: "center" | "right" | "custom" | "cart";
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ children, type }) => {
  // if (!isOpen) {
  //     return null;
  // }

  return (
    <div className="overlay">
      <div className={`overlay__content overlay__content__${type}`}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
