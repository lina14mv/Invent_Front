import { faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Usuarios = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Usuarios</h1>
        <div className="flex gap-8 items-center">
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-black"
              />
            </span>
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <i>
            <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
          </i>
        </div>
      </div>
      <div className="flex my-5 gap-3">
        <select className="bg-gray-100 border-gray-300 rounded-md">
          <option value="0">Rol</option>
          <option value="1">Admin</option>
          <option value="2">Vendedor</option>
        </select>
        <select className="bg-gray-100 border-gray-300 rounded-md p-2">
          <option value="0">Estado</option>
          <option value="1">Habilitado</option>
          <option value="2">Deshabilitado</option>
        </select>
        <button className="bg-red-500 rounded-md px-2 hover:cursor-pointer">
          Borrar filtros
        </button>
      </div>
      <div className="mt-3">
        <table className="table-fixed w-full text-center border-separate">
          <thead className="border">
            <tr className="bg-green-200">
              <th className="py-2">Nombre</th>
              <th className="">Estado</th>
              <th className="">Rol</th>
              <th className="">Telefono</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            <tr className="odd:bg-white even:bg-gray-200">
              <td>Admin1</td>
              <td>Activo</td>
              <td>Admin</td>
              <td>12345678</td>
            </tr>
            <tr>
              <td>Admin2</td>
              <td>Activo</td>
              <td>Admin</td>
              <td>12345678</td>
            </tr>
            <tr className="bg-white even:bg-gray-200">
              <td>Vendedor1</td>
              <td>Activo</td>
              <td>Vendedor</td>
              <td>12345678</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Usuarios;