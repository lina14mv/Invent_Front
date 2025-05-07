import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/EmpresaSidebar";
import Inicio from "../features/empresa/Inicio";
import Productos from "../features/empresa/Productos";
import Inventario from "../features/empresa/Inventario";
import Ventas from "../features/empresa/Ventas";
import Finanzas from "../features/empresa/Finanzas";
import Tickets from "../features/empresa/Tickets";
import Configuracion from "../features/empresa/Configuracion";
import Empleados from "../features/empresa/Empleados";
import { useState } from "react";

const EmpresaDashboardPage = () => {
  const [ancho, setAncho] = useState("64");

  const cambiarAncho = (ancho) => {
    setAncho(ancho);
  };

  return (
    <section className="flex">
      {/* Sidebar */}
      <div className={`w-${ancho}`}>
        <Sidebar enviarAncho={cambiarAncho} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 h-full p-7">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/finanzas" element={<Finanzas />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/empleados" element={<Empleados />} />
        </Routes>
      </div>
    </section>
  );
};

export default EmpresaDashboardPage;