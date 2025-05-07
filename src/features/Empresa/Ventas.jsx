import React, { useState, useEffect } from "react";
import axios from "axios";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProducto, setFiltroProducto] = useState("");
  const [mostrarModalVenta, setMostrarModalVenta] = useState(false);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente: "",
    producto: "",
    cantidad: 1,
    total: 0,
  });
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchVentas = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/ventas");
        setVentas(response.data);
      } catch (err) {
        console.error("Error al cargar las ventas:", err);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/clientes");
        setClientes(response.data);
      } catch (err) {
        console.error("Error al cargar los clientes:", err);
      }
    };

    fetchVentas();
    fetchClientes();
  }, []);

  const handleRealizarVenta = () => {
    // Simulación de agregar venta
    setVentas([...ventas, { ...nuevaVenta, id: ventas.length + 1 }]);
    setMostrarModalVenta(false);
    setNuevaVenta({
      cliente: "",
      producto: "",
      cantidad: 1,
      total: 0,
    });
  };

  const handleCrearCliente = () => {
    // Simulación de agregar cliente
    setClientes([...clientes, { ...nuevoCliente, id: clientes.length + 1 }]);
    setMostrarModalCliente(false);
    setNuevoCliente({
      nombre: "",
      correo: "",
      telefono: "",
    });
  };

  const ventasFiltradas = ventas.filter((venta) => {
    const cumpleFecha = filtroFecha ? venta.fecha.includes(filtroFecha) : true;
    const cumpleCliente = filtroCliente
      ? venta.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
      : true;
    const cumpleProducto = filtroProducto
      ? venta.producto.toLowerCase().includes(filtroProducto.toLowerCase())
      : true;
    return cumpleFecha && cumpleCliente && cumpleProducto;
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Ventas</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-5">
        <input
          type="date"
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por cliente"
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroCliente}
          onChange={(e) => setFiltroCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por producto"
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroProducto}
          onChange={(e) => setFiltroProducto(e.target.value)}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
          onClick={() => {
            setFiltroFecha("");
            setFiltroCliente("");
            setFiltroProducto("");
          }}
        >
          Borrar Filtros
        </button>
      </div>

      {/* Tabla de ventas */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Cliente</th>
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.map((venta) => (
            <tr key={venta.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{venta.fecha}</td>
              <td className="border border-gray-300 px-4 py-2">{venta.cliente}</td>
              <td className="border border-gray-300 px-4 py-2">{venta.producto}</td>
              <td className="border border-gray-300 px-4 py-2">{venta.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">${venta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones para realizar venta y crear cliente */}
      <div className="flex justify-end gap-4 mt-5">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModalVenta(true)}
        >
          Realizar Venta
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          onClick={() => setMostrarModalCliente(true)}
        >
          Crear Cliente
        </button>
      </div>

      {/* Modal para realizar venta */}
      {mostrarModalVenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Realizar Venta</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Cliente</label>
              <select
                value={nuevaVenta.cliente}
                onChange={(e) =>
                  setNuevaVenta({ ...nuevaVenta, cliente: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.nombre}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Producto</label>
              <input
                type="text"
                value={nuevaVenta.producto}
                onChange={(e) =>
                  setNuevaVenta({ ...nuevaVenta, producto: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Cantidad</label>
              <input
                type="number"
                min="1"
                value={nuevaVenta.cantidad}
                onChange={(e) =>
                  setNuevaVenta({ ...nuevaVenta, cantidad: parseInt(e.target.value) || 1 })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Total</label>
              <input
                type="number"
                min="0"
                value={nuevaVenta.total}
                onChange={(e) =>
                  setNuevaVenta({ ...nuevaVenta, total: parseFloat(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setMostrarModalVenta(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                onClick={handleRealizarVenta}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear cliente */}
      {mostrarModalCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crear Cliente</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nuevoCliente.nombre}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Correo</label>
              <input
                type="email"
                value={nuevoCliente.correo}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Teléfono</label>
              <input
                type="text"
                value={nuevoCliente.telefono}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setMostrarModalCliente(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                onClick={handleCrearCliente}
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

export default Ventas;