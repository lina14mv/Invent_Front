import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CerrarSesion = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const datos = {
        correo: localStorage.getItem("correo"), // reemplaza por el valor real
        tipo: localStorage.getItem("tipo"), // ejemplo de cómo obtener el token
      };
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5002/api/cerrarSesion", datos, {
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      localStorage.clear();
      window.location.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>
        <i>
          <FontAwesomeIcon
            icon={faDoorOpen}
            className="text-2xl cursor-pointer"
          />
        </i>
      </button>
    </>
  );
};
