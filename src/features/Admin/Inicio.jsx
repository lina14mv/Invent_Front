import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardInfo } from "../../shared/Card";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Inicio = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Hellow Admin!!</h1>
        <i>
          <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
        </i>
      </div>
      <div className="flex px-6 justify-evenly py-8">
        <CardInfo
          icon={faCircleUser}
          num="200"
          description="Empresas registradas"
        ></CardInfo>
        <CardInfo
          icon={faCircleUser}
          num="200"
          description="Empresas registradas"
        ></CardInfo>
        <CardInfo
          icon={faCircleUser}
          num="200"
          description="Empresas registradas"
        ></CardInfo>
        <CardInfo
          icon={faCircleUser}
          num="200"
          description="Empresas registradas"
        ></CardInfo>
      </div>
      <div className="mt-3">
        <table className="table-fixed w-full text-center border-separate">
          <thead className="border ">
            <tr className="bg-green-200">
              <th className="py-2">Nombre</th>
              <th className="">Estado</th>
              <th className="">Ubicacion</th>
              <th className="">Telefono</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            <tr className="odd:bg-white even:bg-gray-200">
              <td>Invent++</td>
              <td>Activo</td>
              <td>San Salvador</td>
              <td>12345678</td>
            </tr>
            <tr>
              <td>Invent++</td>
              <td>Activo</td>
              <td>San Salvador</td>
              <td>12345678</td>
            </tr>
            <tr>
              <td>Invent++</td>
              <td>Activo</td>
              <td>San Salvador</td>
              <td>12345678</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inicio;
