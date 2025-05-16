import React, { useState, useEffect } from "react";
import axios from "axios";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    correo: "",
    rol: "empleado",
  });
  const id_negocio = localStorage.getItem("id");

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/por-negocio");
        // Filtrar empleados por el id del negocio actual
        const empleadosFiltrados = response.data.filter(
          (empleado) => String(empleado.id_negocio) === String(id_negocio)
        );
        setEmpleados(empleadosFiltrados);
      } catch (err) {
        console.error("Error al cargar los empleados:", err);
      }
    };

    fetchEmpleados();
  }, [id_negocio]);

  const handleCrearEmpleado = async () => {
    try {
      await axios.post("http://localhost:5002/api/crear-empleado", {
        ...nuevoEmpleado,
        pertenece_negocio: id_negocio,
      });
      setMostrarModal(false);
      setNuevoEmpleado({
        nombre: "",
        cedula: "",
        telefono: "",
        correo: "",
        rol: "empleado",
      });
      // Recargar empleados
      const response = await axios.get("http://localhost:5002/api/por-negocio");
      const empleadosFiltrados = response.data.filter(
        (empleado) => String(empleado.id_negocio) === String(id_negocio)
      );
      setEmpleados(empleadosFiltrados);
    } catch (err) {
      alert("Error al crear el empleado.");
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Empleados</h1>

      {/* Botón para crear empleado */}
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModal(true)}
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
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_empleado || empleado.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{empleado.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{empleado.cedula}</td>
              <td className="border border-gray-300 px-4 py-2">{empleado.correo}</td>
              <td className="border border-gray-300 px-4 py-2">{empleado.telefono}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{empleado.rol}</td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.estado === "activo" ? (
                  <span className="text-green-600 font-semibold">Activo</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactivo</span>
                )} </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear empleado */}
      {mostrarModal && (
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
                  setNuevoEmpleado({ ...nuevoEmpleado, telefono: e.target.value })
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
                onClick={() => setMostrarModal(false)}
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
    </div>
  );
};

export default Empleados;