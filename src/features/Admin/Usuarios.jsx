import React, { useEffect, useState } from "react";
import { faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Usuarios = () => {
  const [negocios, setNegocios] = useState([]); // Lista de negocios
  const [usuarios, setUsuarios] = useState([]); // Todos los usuarios
  const [negocioSeleccionado, setNegocioSeleccionado] = useState(""); // Filtro por negocio
  const [filtroRol, setFiltroRol] = useState(""); // Filtro por rol
  const [filtroEstado, setFiltroEstado] = useState(""); // Filtro por estado
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/por-negocio");
        setNegocios(response.data); // Guardar todos los negocios
        const todosUsuarios = response.data.flatMap((negocio) => negocio.usuarios); // Combinar todos los usuarios
        setUsuarios(todosUsuarios);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los usuarios. Por favor, intenta nuevamente.");
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios según el negocio, rol, estado y que tengan nombre
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const tieneNombre = usuario.nombre && usuario.nombre.trim() !== ""; // Verificar que tenga nombre
    const perteneceNegocio = negocioSeleccionado
      ? negocios.find((negocio) => negocio.id_negocio === parseInt(negocioSeleccionado))?.usuarios.some(
          (u) => u.id_usuario === usuario.id_usuario
        )
      : true;
    const cumpleRol = filtroRol ? usuario.rol === filtroRol : true;
    const cumpleEstado = filtroEstado
      ? filtroEstado === "activo"
        ? usuario.activo
        : !usuario.activo
      : true;
    return tieneNombre && perteneceNegocio && cumpleRol && cumpleEstado;
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Usuarios</h1>
        <div className="flex gap-8 items-center">
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
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
        <select
          className="bg-gray-100 border-gray-300 rounded-md"
          value={negocioSeleccionado}
          onChange={(e) => setNegocioSeleccionado(e.target.value)}
        >
          <option value="">Todos los negocios</option>
          {negocios.map((negocio) => (
            <option key={negocio.id_negocio} value={negocio.id_negocio}>
              {negocio.nombre_negocio}
            </option>
          ))}
        </select>
        <select
          className="bg-gray-100 border-gray-300 rounded-md"
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
        >
          <option value="">Todos los roles</option>
          <option value="administrador">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
        <select
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button
          className="bg-red-500 text-white rounded-md px-2 hover:cursor-pointer"
          onClick={() => {
            setNegocioSeleccionado("");
            setFiltroRol("");
            setFiltroEstado("");
          }}
        >
          Borrar filtros
        </button>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="mt-3">
          <table className="table-fixed w-full text-center border-separate">
            <thead className="border">
              <tr className="bg-green-200">
                <th className="py-2">Nombre</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id_usuario} className="odd:bg-white even:bg-gray-200">
                  <td>{usuario.nombre}</td>
                  <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Usuarios;