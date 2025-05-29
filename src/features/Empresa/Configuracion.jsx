import React, { useState, useEffect } from "react";
import axios from "axios";

const Configuracion = () => {
  const [empresa, setEmpresa] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    nit: "",
    id: "",
  });
  const DISEÑOS = [
    {
      nombre: "Predeterminado",
      fondo: "white",
      color_primario: "black",
      color_secundario: "palegreen",
    },
    {
      nombre: "Lavanda",
      fondo: "lavender",
      color_primario: "mediumslateblue",
      color_secundario: "white",
    },
    {
      nombre: "Tierra y Sol",
      fondo: "moccasin",
      color_primario: "peru",
      color_secundario: "peachpuff",
    },
    {
      nombre: "Laguna",
      fondo: "honeydew",
      color_primario: "goldenrod",
      color_secundario: "paleturquoise",
    }, 
     {
      nombre: "Oceano",
      fondo: "aliceblue",
      color_primario: "teal",
      color_secundario: "midnightblue",
    },
    {
      nombre: "Sobrio",
      fondo: "white",
      color_primario: "purple",
      color_secundario: "gray",
    },
    {
      nombre: "Volcan",
      fondo: "white",
      color_primario: "orange",
      color_secundario: "brown",
    },
    {
      nombre: "Coral",
      fondo: "seashell",
      color_primario: "coral",
      color_secundario: "darkslategray",
    },
    
  ];

  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const id_negocio = localStorage.getItem("id");
  const [diseñoSeleccionado, setDiseñoSeleccionado] = useState("");
  console.log("ID Negocio:", id_negocio);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get("http://3.144.253.195/api/negocios");
        const negocios = Array.isArray(response.data)
          ? response.data
          : response.data.negocios;
        // Ajusta el nombre del campo según tu backend
        const negocio = negocios.find(
          (n) => String(n.id_negocio || n.id) === String(id_negocio)
        );
        if (negocio) {
          setEmpresa({
            nombre: negocio.nombre_negocio || negocio.nombre || "",
            correo: negocio.correo || "",
            telefono: negocio.telefono || "",
            direccion: negocio.direccion || "",
            nit: negocio.nit || "",
            fondo: negocio.fondo || "",
            color_primario: negocio.color_primario || "",
            color_secundario: negocio.color_secundario || "",
            id: Number(negocio.id_negocio || negocio.id), // <-- asegúrate que es número
          });
        }
      } catch (err) {
        console.error("Error al cargar los datos de la empresa:", err);
      }
    };

    fetchEmpresa();
  }, [id_negocio]);

  const handleEditar = () => setEditando(true);

  const handleCancelar = () => {
    setEditando(false);
    setMensaje("");
    // Recargar datos originales
    window.location.reload();
  };

  const handleGuardarCambios = async () => {
    if (!empresa.id) {
      setMensaje("No se encontró el ID de la empresa.");
      return;
    }
    try {
      await axios.put(
        `http://3.144.253.195/api/${empresa.id}/editarE`,
        empresa
      );
      setMensaje("Los datos de la empresa se han actualizado correctamente.");
      setEditando(false);
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
          <label className="block font-semibold mb-2">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            value={empresa.nombre}
            disabled={!editando}
            onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={empresa.correo}
            disabled={!editando}
            onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Teléfono</label>
          <input
            type="text"
            value={empresa.telefono}
            disabled={!editando}
            onChange={(e) =>
              setEmpresa({ ...empresa, telefono: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Dirección</label>
          <input
            type="text"
            value={empresa.direccion}
            disabled={!editando}
            onChange={(e) =>
              setEmpresa({ ...empresa, direccion: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">NIT</label>
          <input
            type="text"
            value={empresa.nit}
            disabled={!editando}
            onChange={(e) => setEmpresa({ ...empresa, nit: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Diseño de Colores</label>
          <select
            value={diseñoSeleccionado}
            disabled={!editando}
            onChange={(e) => {
              setDiseñoSeleccionado(e.target.value);
              const diseño = DISEÑOS.find((d) => d.nombre === e.target.value);
              if (diseño) {
                setEmpresa({
                  ...empresa,
                  fondo: diseño.fondo,
                  color_primario: diseño.color_primario,
                  color_secundario: diseño.color_secundario,
                });
              }
            }}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecciona un diseño</option>
            {DISEÑOS.map((d) => (
              <option key={d.nombre} value={d.nombre}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Color Fondo</label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border"
              style={{ background: empresa.fondo }}
            ></div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Color Primario</label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border"
              style={{ background: empresa.color_primario }}
            ></div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Color Secundario</label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border"
              style={{ background: empresa.color_secundario }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-4">
        {!editando ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            onClick={handleEditar}
          >
            Editar
          </button>
        ) : (
          <>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              onClick={handleGuardarCambios}
            >
              Guardar Cambios
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Configuracion;
