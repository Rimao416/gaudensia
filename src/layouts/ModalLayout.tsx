import ReactDOM from "react-dom";

interface ModalLayoutProps {
  children: React.ReactNode;
  type: "center" | "right" | "custom" | "cart";
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ children, type }) => {
  return ReactDOM.createPortal(
    <div className="overlay">
      <div className={`overlay__content overlay__content__${type}`}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalLayout;
