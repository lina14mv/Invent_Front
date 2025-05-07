import React, { useState, useEffect } from "react";
import axios from "axios";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "empleado",
    activo: true,
  });

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/empleados");
        setEmpleados(response.data);
      } catch (err) {
        console.error("Error al cargar los empleados:", err);
      }
    };

    fetchEmpleados();
  }, []);

  const handleCrearEmpleado = () => {
    // Simulación de agregar empleado
    setEmpleados([...empleados, { ...nuevoEmpleado, id: empleados.length + 1 }]);
    setMostrarModal(false);
    setNuevoEmpleado({
      nombre: "",
      correo: "",
      telefono: "",
      rol: "empleado",
      activo: true,
    });
  };

  const handleToggleActivo = (id) => {
    const empleadosActualizados = empleados.map((empleado) =>
      empleado.id === id ? { ...empleado, activo: !empleado.activo } : empleado
    );
    setEmpleados(empleadosActualizados);
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
            <th className="border border-gray-300 px-4 py-2">Correo</th>
            <th className="border border-gray-300 px-4 py-2">Teléfono</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{empleado.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{empleado.correo}</td>
              <td className="border border-gray-300 px-4 py-2">{empleado.telefono}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{empleado.rol}</td>
              <td className="border border-gray-300 px-4 py-2">
                {empleado.activo ? "Activo" : "Inactivo"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-3 py-1 rounded-md ${
                    empleado.activo
                      ? "bg-red-600 text-white hover:bg-red-500"
                      : "bg-green-600 text-white hover:bg-green-500"
                  }`}
                  onClick={() => handleToggleActivo(empleado.id)}
                >
                  {empleado.activo ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear empleado */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
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