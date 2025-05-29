import React, { useEffect, useState } from "react";
import { CerrarSesion } from "../../components/cerrarSesion";
import axios from "axios";
import Notiflix from "notiflix";

export const Solicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.144.253.195/api/listarContactos")
      .then((response) => {
        setSolicitudes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener solicitudes:", error);
      });
  }, []);

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para eliminar una solicitud
  const eliminarSolicitud = async (id) => {
    try {
      await axios.post("http://3.144.253.195/api/contactado", {
        "id_contacto": id,
      });
      // Refrescar la lista después de marcar como contactado
      const response = await axios.get("http://3.144.253.195/api/listarContactos");
      setSolicitudes(response.data);
      Notiflix.Notify.success("Solicitud eliminada correctamente");
    } catch (error) {
      Notiflix.Notify.failure("Error al eliminar la solicitud");
      console.log("Error al eliminar la solicitud:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Solicitudes</h1>
        <CerrarSesion />
      </div>
      <div className="flex mt-8 text-xl h-full flex-wrap gap-6">
        {solicitudes.map((solicitud) => (
          <div
            key={solicitud.id_contacto}
            className="w-72 min-h-56 bg-white border border-green-200 p-4 flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 relative"
          >
            <button
              className="absolute top-2 right-2 text-green-500 hover:text-green-700 text-lg font-bold rounded-full px-2 py-0.5"
              title="Eliminar"
              onClick={() => eliminarSolicitud(solicitud.id_contacto)}
            >
              ×
            </button>
            <h1 className="font-bold text-center text-lg mb-4 text-green-700 truncate">
              {solicitud.nombre}
            </h1>
            <p className="text-base mb-2 text-gray-700 line-clamp-3">
              {solicitud.mensaje}
            </p>
            <div className="flex flex-col gap-1 mt-auto">
              <span className="text-sm text-gray-500">
                <b>Tel:</b> {solicitud.telefono}
              </span>
              <span className="text-sm text-gray-500">
                <b>Correo:</b> {solicitud.correo}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {formatFecha(solicitud.fecha)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
// contactado: true;
// correo: "adas@dasd.com";
// fecha: "2025-05-28T21:15:22.759Z";
// id_contacto: 5;
// mensaje: "dadsa";
// nombre: "dasdsd";
// telefono: "3232323232";
