import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Operaciones = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Operaciones</h1>
        <i>
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
        </i>
      </div>
    </>
  );
};

export default Operaciones;
