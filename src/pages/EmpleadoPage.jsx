import { useEffect, useState } from "react";
import { EmpleadoSidebar } from "../components/EmpleadoSidebar";
//import { Inicio } from "../features/Empleado/Inicio";
import Inicio from "../features/Empresa/Inicio";
import Ventas from "../features/Empresa/Ventas";
import Inventario from "../features/Empresa/Inventario";
import Productos from "../features/Empresa/Productos";
import Tickets from "../features/Empresa/Tickets";
import { CerrarSesion } from "../components/cerrarSesion";
import Empleados from "../features/Empleado/Empleados";
import {Route, Routes, Navigate} from "react-router-dom";
import axios from "axios";

const EmpleadoPage = () => {
  const [ancho, setAncho] = useState("64");
  const nombreUsuario = localStorage.getItem("nombre") || "USUARIO";
  const rol = localStorage.getItem("rol");

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
        {/* Contenido principal */}
                <div className="flex justify-between">
                        <h1 className="text-3xl font-semibold">¡Hola {nombreUsuario}!</h1>
                        <CerrarSesion />
                      </div>
        <Routes>
          {/* Redirección condicional */}
          {rol === "administrador" ? (
            <Route path="/" element={<Inicio/>} />
          ) : (
            <Route path="/" element={<Ventas/>} />
          )}
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/empleados" element={<Empleados />} />
          {/* Redirección por defecto */}
        </Routes>
      </div>
    </section>
  );
};

export default EmpleadoPage;
