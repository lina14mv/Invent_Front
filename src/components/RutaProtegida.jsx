import { Navigate } from "react-router-dom";

export const RutaProtegida = ({ tipo, rol, children }) => {
  const correo = localStorage.getItem("correo");
  const Tipo = localStorage.getItem("tipo");
  const Rol = localStorage.getItem("rol");

  if (rol !== "null") {
    if (tipo === Tipo && rol === Rol) {
      return children;
    }
  }
  if (Tipo === tipo) {
    return children;
  }

  return <Navigate to="/" />;
};
