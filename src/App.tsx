import "./main.scss";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import useUserData from "./components/userData";
import Category from "./pages/Category";
import Plats from "./pages/Plats";
function App() {
  useUserData();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<Category />} />
      <Route path="/plats/:id" element={<Plats/>}/>
    </Routes>
  );
}

export default App;
