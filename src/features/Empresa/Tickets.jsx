import React, { useState, useEffect } from "react";
import axios from "axios";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoTicket, setNuevoTicket] = useState({
    asunto: "",
    descripcion: "",
    estado: "abierto",
  });

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/tickets");
        setTickets(response.data);
      } catch (err) {
        console.error("Error al cargar los tickets:", err);
      }
    };

    fetchTickets();
  }, []);

  const handleCrearTicket = () => {
    // Simulación de agregar ticket
    setTickets([...tickets, { ...nuevoTicket, id: tickets.length + 1 }]);
    setMostrarModal(false);
    setNuevoTicket({
      asunto: "",
      descripcion: "",
      estado: "abierto",
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Tickets</h1>

      {/* Botón para crear ticket */}
      <div className="flex justify-end mb-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModal(true)}
        >
          Crear Ticket
        </button>
      </div>

      {/* Tabla de tickets */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Asunto</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{ticket.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.asunto}</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">{ticket.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear ticket */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
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