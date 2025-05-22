import { Route, Routes } from "react-router-dom";
import Inicio from "../features/Admin/Inicio";
import Empresas from "../features/Admin/Empresas";
import Usuarios from "../features/Admin/Usuarios";
import Finanzas from "../features/Admin/Finanzas";
import Soporte from "../features/Admin/Soporte";
import Configuracion from "../features/Admin/Configuracion";
import Sidebar from "../components/sidebar";
import { useState } from "react";


const ManegePage = () => {

  const [ancho, setAncho] = useState("64");

  const cambiarAncho = (ancho) => {
    setAncho(ancho);
  }

  return (
    <section className="flex">
      <div className={`w-${ancho}`}>
        <Sidebar enviarAncho={cambiarAncho}/>
      </div>
      <div className="flex-1 h-full p-8 ">
        <Routes>
          <Route path="/" element={<Inicio />}/>
          <Route path="/empresas" element={<Empresas/>}/>
          <Route path="/usuarios" element={<Usuarios />}/>
          <Route path="/finanzas" element={<Finanzas />}/>
          <Route path="/soporte" element={<Soporte />}/>
        </Routes>
      </div>
    </section>
  );
};

export default ManegePage;
