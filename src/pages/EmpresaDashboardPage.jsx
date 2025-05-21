import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/EmpresaSidebar";
import Inicio from "../features/Empresa/Inicio";
import Productos from "../features/Empresa/Productos";
import Inventario from "../features/Empresa/Inventario";
import Ventas from "../features/Empresa/Ventas";
import Finanzas from "../features/empresa/Finanzas";
import Tickets from "../features/Empresa/Tickets";
import Configuracion from "../features/Empresa/Configuracion";
import Empleados from "../features/Empresa/Empleados";
import { CerrarSesion } from "../components/CerrarSesion";
import { useState } from "react";

const EmpresaDashboardPage = () => {
  const [ancho, setAncho] = useState("64");
  const nombreEmpresa = localStorage.getItem("nombre") || "EMPRESA";

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
        <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">¡Hola {nombreEmpresa}!</h1>
                <CerrarSesion />
              </div>
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