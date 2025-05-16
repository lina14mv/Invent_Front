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
    <section className="flex">
      <div className={ancho === "64" ? "w-64" : "w-14"}>
        <EmpleadoSidebar enviarAncho={cambiarAncho} />
      </div>

      <div className="background flex-1 h-screen p-7">
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </section>
  );
};

export default EmpleadoPage;