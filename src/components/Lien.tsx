import { Link } from "react-router-dom";
interface LienProps {
  to: string;
  redirection: string;
  type: string;
}
function Lien({ to, redirection, type }: LienProps) {
  return (
    <Link className={`link link__${type}`} to={to}>
      {redirection}
    </Link>
  );
}

export default Lien;
