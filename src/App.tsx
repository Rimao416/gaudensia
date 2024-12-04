import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import useUserData from "./components/userData";
import Category from "./pages/Category";
import Plats from "./pages/Plats";
import Checkout from "./pages/Checkout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  useUserData();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/a-propos"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        }
      />
      <Route path="/menu" element={<Menu />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/menu/:id" element={<Category />} />
      <Route path="/plats/:id" element={<Plats />} />
    </Routes>
  );
}

export default App;
