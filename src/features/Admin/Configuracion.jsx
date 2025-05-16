import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CerrarSesion } from "../../components/cerrarSesion";

const Configuracion = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Configuración</h1>
        <CerrarSesion />
      </div>
    </>
  );
};

export default Configuracion;
