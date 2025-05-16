import { useState } from "react";
import { EmpleadoSidebar } from "../components/EmpleadoSidebar";
import { Inicio } from "../features/Empleado/Inicio";
import { Route, Routes } from "react-router-dom";

const EmpleadoPage = () => {
  const [ancho, setAncho] = useState("64");

  const cambiarAncho = (ancho) => {
    setAncho(ancho);
  };

  return (
    <section className="flex primary">
      <div className={`w-${ancho}`}>
        <EmpleadoSidebar enviarAncho={cambiarAncho} />
      </div>

      <div className="flex-1 h-screen p-7 background">
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </section>
  );
};

export default EmpleadoPage;
