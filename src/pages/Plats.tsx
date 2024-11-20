import Navbar from "../components/Navbar";
import Bnr from "../assets/bnr2.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleDish } from "../slice/dishSlice";
function Plats() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state) => state.dishes
  );
  useEffect(() => {
    if (id) {
      // Vérifie que l'id est défini avant de déclencher l'action
      dispatch(fetchSingleDish(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Si une erreur se produit ou si le plat n'est pas trouvé, retourne à la page précédente
    if (error) {
      navigate(-1);
    }
  }, [error, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <>
      <Navbar />
      <div className="plats">
        <div className="plats__header">
          <img src={Bnr} alt={Bnr} className="plats__banner" />
          <div className="plats__title">
            <h1>Plats</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Plats;
