import React, { useState, useEffect } from "react";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    estado: "disponible",
  });

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/productos");
        setProductos(response.data);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregarProducto = () => {
    // Simulación de agregar producto
    setProductos([...productos, { ...nuevoProducto, id: productos.length + 1 }]);
    setMostrarModal(false);
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      categoria: "",
      precio: "",
      estado: "disponible",
    });
  };

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria = filtroCategoria
      ? producto.categoria === filtroCategoria
      : true;
    const cumpleEstado = filtroEstado
      ? producto.estado === filtroEstado
      : true;
    return cumpleCategoria && cumpleEstado;
  });

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          onClick={() => setMostrarModal(true)}
        >
          Agregar Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-5">
        <select
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="alimentos">Alimentos</option>
          <option value="bebidas">Bebidas</option>
          <option value="ropa">Ropa</option>
        </select>
        <select
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="disponible">Disponible</option>
          <option value="no disponible">No disponible</option>
        </select>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
          onClick={() => {
            setFiltroCategoria("");
            setFiltroEstado("");
          }}
        >
          Borrar Filtros
        </button>
      </div>

      {/* Tabla de productos */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Categoría</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.categoria}</td>
              <td className="border border-gray-300 px-4 py-2">${producto.precio}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {producto.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar producto */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Descripción</label>
              <textarea
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Categoría</label>
              <input
                type="text"
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Precio</label>
              <input
                type="number"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Estado</label>
              <select
                value={nuevoProducto.estado}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, estado: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="disponible">Disponible</option>
                <option value="no disponible">No disponible</option>
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
                onClick={handleAgregarProducto}
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

export default Productos;