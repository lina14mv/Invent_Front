import { Navigate } from "react-router-dom";

export const RutaProtegida = ({ tipo, children }) => {
  const correo = localStorage.getItem("correo");
  const rol = localStorage.getItem("rol");
  if (rol === tipo) {
    return children;
  }

  return <Navigate to="/" />;
};
