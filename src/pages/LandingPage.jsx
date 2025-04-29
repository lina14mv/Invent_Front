import { Route, Routes } from "react-router-dom";
import Inicio from "../features/landing/Inicio";
import Somos from "../features/landing/Somos";
import Contactanos from "../features/landing/Contactanos";
import Productos from "../features/landing/Productos";
import Navbar from "../components/navbar";

const LandingPage = () => {
  return (
    <section className="w-screen h-screen overflow-x-hidden lg:overflow-y-hidden overflow-y-scroll">
      <header className="flex items-center justify-center top-0 left-0 w-full h-18 pr-10 bg-white drop-shadow-md z-10">
        <Navbar />
      </header>
      <main className="flex-1 bg-green-100 h-full">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Somos" element={<Somos />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Contactanos" element={<Contactanos />} />
        </Routes>
      </main>
    </section>
  );
};

export default LandingPage;
