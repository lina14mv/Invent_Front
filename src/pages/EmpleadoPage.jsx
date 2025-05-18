import { useEffect, useState } from "react";
import { EmpleadoSidebar } from "../components/EmpleadoSidebar";
import { Inicio } from "../features/Empleado/Inicio";
import Ventas from "../features/Empresa/Ventas";
import Inventario from "../features/Empresa/Inventario";
import Productos from "../features/Empresa/Productos";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

const EmpleadoPage = () => {
  const [ancho, setAncho] = useState("64");

  const cambiarAncho = (ancho) => {
    setAncho(ancho);
  };

  useEffect(() => {
    const correo = localStorage.getItem("correo");
    const tipo = localStorage.getItem("tipo");

    axios
      .post(
        "http://localhost:5002/api/colores-negocio",
        { correo: correo, tipo: tipo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        document.documentElement.style.setProperty("--primary-color", response.data.color_primario);
        document.documentElement.style.setProperty("--secondary-color", response.data.color_secundario);
        document.documentElement.style.setProperty("--background-color", response.data.fondo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="flex primary">
      <div className={ancho === "64" ? "w-64" : "w-14"}>
        <EmpleadoSidebar enviarAncho={cambiarAncho} />
      </div>

      <div className="background flex-1 h-screen p-7">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
    </section>
  );
};

export default EmpleadoPage;
