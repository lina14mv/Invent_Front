import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Soporte = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Soporte</h1>
        <i>
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
        </i>
      </div>
      <div className="flex columns-4 justify-evenly mt-8 text-xl">
        <div>Pendiente</div>
        <div>Proceso</div>
        <div>Revisión</div>
        <div>Finalizado</div>
      </div>
    </>
  );
};

export default Soporte;
