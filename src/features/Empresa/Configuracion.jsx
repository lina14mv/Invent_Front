import React, { useState, useEffect } from "react";
import axios from "axios";

const Configuracion = () => {
  const [empresa, setEmpresa] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    nit: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/empresa");
        setEmpresa(response.data);
      } catch (err) {
        console.error("Error al cargar los datos de la empresa:", err);
      }
    };

    fetchEmpresa();
  }, []);

  const handleGuardarCambios = async () => {
    try {
      // Simulación de guardar cambios
      await axios.put("http://localhost:5002/api/empresa", empresa);
      setMensaje("Los datos de la empresa se han actualizado correctamente.");
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setMensaje("Ocurrió un error al guardar los cambios.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Configuración de la Empresa</h1>

      {mensaje && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-5">
          {mensaje}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Nombre de la Empresa</label>
          <input
            type="text"
            value={empresa.nombre}
            onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={empresa.correo}
            onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Teléfono</label>
          <input
            type="text"
            value={empresa.telefono}
            onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Dirección</label>
          <input
            type="text"
            value={empresa.direccion}
            onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">NIT</label>
          <input
            type="text"
            value={empresa.nit}
            onChange={(e) => setEmpresa({ ...empresa, nit: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={handleGuardarCambios}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Configuracion;