import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import useUserData from "./components/userData";
import Category from "./pages/Category";
import Plats from "./pages/Plats";
import Checkout from "./pages/Checkout";
import { lazy, Suspense } from "react";
import Account from "./pages/Account";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Menu= lazy(() => import("./pages/Menu"));
const Order= lazy(() => import("./pages/Order"));

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
      <Route
        path="/menu"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </Suspense>
          
        }
      />
      <Route
        path="/order"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Order />
          </Suspense>
          
        }
      />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/menu/:id" element={<Category />} />
      <Route path="/plats/:id" element={<Plats />} />
      <Route path="/account" element={<Account/>} />

    </Routes>
  );
}

export default App;
