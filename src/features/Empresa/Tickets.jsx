import React, { useState, useEffect } from "react";
import axios from "axios";
import Notiflix from "notiflix";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");
const [filtroPrioridad, setFiltroPrioridad] = useState("");
  const [idNegocioReal, setIdNegocioReal] = useState(null);
  const [nuevoTicket, setNuevoTicket] = useState({
    asunto: "",
    descripcion: "",
    estado: "abierto",
  });

  const tipo = localStorage.getItem("tipo");
  const id_usuario = localStorage.getItem("id");
  const id_negocio_local = localStorage.getItem("id");
  const rol = localStorage.getItem("rol");

  useEffect(() => {
    const obtenerIdNegocio = async () => {
      if (tipo === "usuario") {
        try {
          const res = await axios.get(
            `http://3.144.253.195/api/usuario/${id_usuario}`
          );
          setIdNegocioReal(res.data.pertenece_negocio);
        } catch (err) {
          console.error("Error al obtener el negocio del usuario:", err);
        }
      } else {
        setIdNegocioReal(id_negocio_local);
      }
    };
    obtenerIdNegocio();
  }, [tipo, id_usuario, id_negocio_local]);

  // Obtener tickets según la lógica de tipo y rol
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://3.144.253.195/api/ver-tickets");
        let ticketsFiltrados = [];
        if (response.data && Array.isArray(response.data.tickets)) {
          if (tipo === "negocio" || (tipo === "usuario" && rol === "administrador")) {
            // Mostrar todos los tickets del negocio
            ticketsFiltrados = response.data.tickets.filter(
              (ticket) => String(ticket.id_negocio) === String(idNegocioReal)
            );
          } else if (tipo === "usuario" && rol === "empleado") {
            // Mostrar solo los tickets del usuario
            ticketsFiltrados = response.data.tickets.filter(
              (ticket) => String(ticket.id_usuario) === String(id_usuario)
            );
          }
          setTickets(ticketsFiltrados);
        } else {
          setTickets([]);
        }
      } catch (err) {
        console.error("Error al cargar los tickets:", err);
        setTickets([]);
      }
    };

    if (idNegocioReal) fetchTickets();
  }, [idNegocioReal, tipo, rol, id_usuario]);

  // Crear ticket según tipo
  const handleCrearTicket = async () => {
    try {
      const payload =
        tipo === "negocio"
          ? {
              id_negocio: idNegocioReal,
              tipo,
              asunto: nuevoTicket.asunto,
              descripcion: nuevoTicket.descripcion,
            }
          : {
              id_negocio: idNegocioReal,
              id_usuario,
              tipo,
              asunto: nuevoTicket.asunto,
              descripcion: nuevoTicket.descripcion,
            };
            const token = localStorage.getItem("token");
      await axios.post("http://3.144.253.195/api/crear-tickets", payload,{
         headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
      setMostrarModal(false);
      setNuevoTicket({
        asunto: "",
        descripcion: "",
        estado: "abierto",
      });
      // Refrescar tickets
      // Espera a que idNegocioReal esté definido
      if (idNegocioReal) {
        const response = await axios.get("http://3.144.253.195/api/ver-tickets");
        let ticketsFiltrados = [];
        if (response.data && Array.isArray(response.data.tickets)) {
          if (tipo === "negocio" || (tipo === "usuario" && rol === "administrador")) {
            ticketsFiltrados = response.data.tickets.filter(
              (ticket) => String(ticket.id_negocio) === String(idNegocioReal)
            );
          } else if (tipo === "usuario" && rol === "empleado") {
            ticketsFiltrados = response.data.tickets.filter(
              (ticket) => String(ticket.id_usuario) === String(id_usuario)
            );
          }
          setTickets(ticketsFiltrados);
        }
      }
    } catch (err) {
      Notiflix.Notify.failure("Error al crear el ticket.");
      console.error(err);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "abierto":
        return "text-red-600 font-bold";
      case "en progreso":
        return "text-yellow-600 font-bold";
      case "cerrado":
        return "text-green-600 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Tickets</h1>
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModal(true)}
        >
          Crear Ticket
        </button>
      </div>
      {/* Filtros */}
    <div className="flex gap-4 mb-5">
      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">Todos los estados</option>
        <option value="abierto">Abierto</option>
        <option value="en progreso">En progreso</option>
        <option value="cerrado">Cerrado</option>
      </select>
      <select
        value={filtroPrioridad}
        onChange={(e) => setFiltroPrioridad(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">Todas las prioridades</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Asunto</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Prioridad</th>
            <th className="border border-gray-300 px-4 py-2">Fecha de Creación</th>
            <th className="border border-gray-300 px-4 py-2">Usuario</th>
          </tr>
        </thead>
       <tbody>
        {tickets
          .filter(
            (ticket) =>
              (!filtroEstado || ticket.estado?.toLowerCase() === filtroEstado) &&
              (!filtroPrioridad || ticket.prioridad?.toLowerCase() === filtroPrioridad)
          )
          .map((ticket) => (
            <tr key={ticket.id_ticket} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{ticket.asunto}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.descripcion}</td>
              <td className={`border border-gray-300 px-4 py-2 capitalize ${getEstadoColor(ticket.estado)}`}>
                {ticket.estado}
              </td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{ticket.prioridad}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ticket.fecha_creacion).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {ticket.nombre_usuario || ticket.nombre_negocio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para crear ticket */}
      {mostrarModal && (
        <div className="fixed inset-0  flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 border ">
            <h2 className="text-xl font-bold mb-4">Crear Ticket</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Asunto</label>
              <input
                type="text"
                value={nuevoTicket.asunto}
                onChange={(e) =>
                  setNuevoTicket({ ...nuevoTicket, asunto: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Descripción</label>
              <textarea
                value={nuevoTicket.descripcion}
                onChange={(e) =>
                  setNuevoTicket({ ...nuevoTicket, descripcion: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              ></textarea>
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
                onClick={handleCrearTicket}
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

export default Tickets;