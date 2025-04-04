import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Finanzas = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Finanzas</h1>
        <i>
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
        </i>
      </div>
    </>
  );
};

export default Finanzas;
