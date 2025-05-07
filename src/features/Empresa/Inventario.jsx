import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [cantidadModificar, setCantidadModificar] = useState({});
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/productos");
        setProductos(response.data);
        verificarAlertas(response.data);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProductos();
  }, []);

  const verificarAlertas = (productos) => {
    const productosBajoStock = productos.filter((producto) => producto.stock < 10);
    setAlertas(productosBajoStock);
  };

  const handleModificarStock = (id, operacion) => {
    const producto = productos.find((p) => p.id === id);
    const nuevaCantidad =
      operacion === "agregar"
        ? producto.stock + (cantidadModificar[id] || 0)
        : producto.stock - (cantidadModificar[id] || 0);

    if (nuevaCantidad < 0) {
      alert("La cantidad no puede ser negativa.");
      return;
    }

    const productosActualizados = productos.map((p) =>
      p.id === id ? { ...p, stock: nuevaCantidad } : p
    );

    setProductos(productosActualizados);
    verificarAlertas(productosActualizados);
    setCantidadModificar({ ...cantidadModificar, [id]: 0 });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Gestión de Inventario</h1>

      {/* Alertas de bajo stock */}
      {alertas.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
          <h2 className="font-bold">Productos con bajo stock:</h2>
          <ul>
            {alertas.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} - Stock: {producto.stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabla de inventario */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.stock}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={cantidadModificar[producto.id] || ""}
                    onChange={(e) =>
                      setCantidadModificar({
                        ...cantidadModificar,
                        [producto.id]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 p-2 border rounded-md"
                  />
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500"
                    onClick={() => handleModificarStock(producto.id, "agregar")}
                  >
                    Agregar
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
                    onClick={() => handleModificarStock(producto.id, "quitar")}
                  >
                    Quitar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;