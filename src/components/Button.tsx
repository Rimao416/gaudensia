interface ButtonProps {
    text: string
    type:string
    onClick: () => void
}
function Button({ text,type, onClick }: ButtonProps) {
  return (
    <button className={`button button__${type}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
