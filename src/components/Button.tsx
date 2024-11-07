interface ButtonProps {
  type: "inline"|"outline";
  onClick: () => void;
  children: React.ReactNode;
  genre?: "button" | "submit";
}
function Button({ type, onClick, children, genre = "button" }: ButtonProps) {
  return (
    <button className={`button button__${type}`} onClick={onClick} type={genre}>
      {children}
    </button>
  );
}

export default Button;
