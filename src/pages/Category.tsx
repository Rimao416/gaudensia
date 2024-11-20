import Navbar from "../components/Navbar";
import Bnr from "../assets/bnr2.jpg";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
// import { fetchMenuByCategory } from "../slice/dishSlice";
import { Link, useParams } from "react-router-dom";
import Item from "../components/Item";
import Footer from "../components/Footer";
function Category() {

  const { id } = useParams();
  console.log(id);
  //   if (!id) {
  //     navigate("/");
  //   }
  const dispatch = useAppDispatch();
  const { categoriesWithDishes, loading } = useAppSelector(
    (state) => state.dishes
  );
  useEffect(() => {
    // dispatch(fetchMenuByCategory(id));
  }, [dispatch, id]);
  console.log(categoriesWithDishes);

  return (
    <>
      <div>
        <Navbar />
        {!loading && (
          <div className="category">
            <div className="category__header">
              <img src={Bnr} alt={Bnr} className="category__banner" />
              <div className="category__title">
                <h1>{categoriesWithDishes[0].category.name}</h1>
                <div className="category__wrapper">
                  <Link to="/menu">
                    <span>
                      Catégorie &gt; {categoriesWithDishes[0].category.name}
                    </span>{" "}
                  </Link>
                </div>
              </div>
            </div>
            <div className="category__body">
              {categoriesWithDishes[0].dishes.map((dishe) => (
                <Item
                  _id={dishe._id}
                  name={dishe.name}
                  description={dishe.description}
                  prices={dishe.prices}
                  category={dishe.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Category;
