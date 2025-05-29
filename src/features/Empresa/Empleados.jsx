import React, { useState, useEffect } from "react";
import axios from "axios";
import Notiflix from "notiflix";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [mostrarModalEidtar, setMostrarModalEidtar] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    correo: "",
    rol: "empleado",
  });
  const [empleadoEditar, setEmpleadoEditar] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const id_negocio = localStorage.getItem("id");

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        // Cambia la URL por la nueva ruta
        const response = await axios.get(
          `http://3.144.253.195/api/verEmpleados/${id_negocio}`
        );
        setEmpleados(response.data);
      } catch (err) {
        console.error("Error al cargar los empleados:", err);
      }
    };

    fetchEmpleados();
  }, [id_negocio]);

  const handleCrearEmpleado = async () => {
    try {
      await axios.post(`http://3.144.253.195/api/crear-empleado`, {
        ...nuevoEmpleado,
        pertenece_negocio: id_negocio,
      });
      setMostrarModalCrear(false);
      setNuevoEmpleado({
        nombre: "",
        cedula: "",
        telefono: "",
        correo: "",
        rol: "empleado",
      });
      // Recargar empleados
      const response = await axios.get(
        `http://3.144.253.195/api/verEmpleados/${id_negocio}`
      );
      setEmpleados(response.data);
    } catch (err) {
      Notiflix.Notify.failure("Error al crear el empleado.");
      console.error(err);
    }
  };

   const empleadosFiltrados = empleados.filter((empleado) => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "activo") return empleado.activo;
    if (filtroEstado === "inactivo") return !empleado.activo;
    return true;
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Empleados</h1>
      <div className="flex justify-between mb-5">
        <div>
          <label className="font-semibold mr-2">Filtrar por estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModalCrear(true)}
        >
          Crear Empleado
        </button>
      </div>
      {/* Tabla de empleados */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cédula</th>
            <th className="border border-gray-300 px-4 py-2">Correo</th>
            <th className="border border-gray-300 px-4 py-2">Teléfono</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosFiltrados.map((empleado) => (
            <tr
              key={empleado.id_usuario}
              className="odd:bg-white even:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                {empleado.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.cedula}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.correo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.telefono}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {empleado.rol}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.activo ? (
                  <span className="text-green-600 font-semibold">Activo</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactivo</span>
                )}
                </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                  onClick={() => {
                    setEmpleadoEditar(empleado);
                    setMostrarModalEidtar(true);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>      
      {/* Modal para crear empleado */}
      {mostrarModalCrear && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 overflow-y-auto border border-green-600">
            <h2 className="text-xl font-bold mb-4">Crear Empleado</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nuevoEmpleado.nombre}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Cédula</label>
              <input
                type="text"
                value={nuevoEmpleado.cedula}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, cedula: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Correo</label>
              <input
                type="email"
                value={nuevoEmpleado.correo}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, correo: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Teléfono</label>
              <input
                type="text"
                value={nuevoEmpleado.telefono}
                onChange={(e) =>
                  setNuevoEmpleado({
                    ...nuevoEmpleado,
                    telefono: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Rol</label>
              <select
                value={nuevoEmpleado.rol}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, rol: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setMostrarModalCrear(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                onClick={handleCrearEmpleado}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {mostrarModalEidtar && empleadoEditar && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 overflow-y-auto border border-green-600">
            <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={empleadoEditar.nombre}
                onChange={(e) =>
                  setEmpleadoEditar({
                    ...empleadoEditar,
                    nombre: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Cédula</label>
              <input
                type="text"
                value={empleadoEditar.cedula}
                onChange={(e) =>
                  setEmpleadoEditar({
                    ...empleadoEditar,
                    cedula: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Correo</label>
              <input
                type="email"
                value={empleadoEditar.correo}
                onChange={(e) =>
                  setEmpleadoEditar({
                    ...empleadoEditar,
                    correo: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Teléfono</label>
              <input
                type="text"
                value={empleadoEditar.telefono}
                onChange={(e) =>
                  setEmpleadoEditar({
                    ...empleadoEditar,
                    telefono: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Rol</label>
              <select
                value={empleadoEditar.rol}
                onChange={(e) =>
                  setEmpleadoEditar({ ...empleadoEditar, rol: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Activo</label>
              <select
                value={empleadoEditar.activo ? "true" : "false"}
                onChange={(e) =>
                  setEmpleadoEditar({
                    ...empleadoEditar,
                    activo: e.target.value === "true",
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setMostrarModalEidtar(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                onClick={async () => {
                  try {
                    await axios.put(
                      `http://3.144.253.195/api/editarEmpleado/${empleadoEditar.id_usuario}`,
                      empleadoEditar
                    );
                    setMostrarModalEidtar(false);
                    setEmpleadoEditar(null);
                    // Recargar empleados
                    const response = await axios.get(
                      `http://3.144.253.195/api/verEmpleados/${id_negocio}`
                    );
                    setEmpleados(response.data);
                  } catch (err) {
                    Notiflix.Notify.failure("Error al editar el empleado.");
                    console.error(err);
                  }
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
