import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CerrarSesion } from "../../components/cerrarSesion";

const Operaciones = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Operaciones</h1>
        <CerrarSesion />
      </div>
    </>
  );
};

export default Operaciones;
