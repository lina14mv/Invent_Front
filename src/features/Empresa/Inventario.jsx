import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [cantidadModificar, setCantidadModificar] = useState({});
  const [alertas, setAlertas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto a editar o agregar

  useEffect(() => {
    const fetchProductos = async () => {
      const id_negocio = localStorage.getItem("id"); // Obtener el ID del negocio desde el localStorage
      if (!id_negocio) {
        console.error("No se encontró el ID del negocio en el localStorage.");
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:5002/api/productos/1',
          //`http://localhost:5002/api/productos/${id_negocio}` // Usar el ID en la ruta
        );

        // Extraer el array de productos de la respuesta
        if (response.data && Array.isArray(response.data.productos)) {
          setProductos(response.data.productos);
          verificarAlertas(response.data.productos);
        } else {
          console.error("La respuesta de la API no contiene un array de productos:", response.data);
          setProductos([]);
        }
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setProductos([]);
      }
    };

    fetchProductos();
  }, []);

  const verificarAlertas = (productos) => {
    const productosBajoStock = productos.filter((producto) => producto.stock < 10);
    setAlertas(productosBajoStock);
  };

  const modificarStock = async (id_producto, operacion) => {
    const cantidad = cantidadModificar[id_producto];
    if (!cantidad || cantidad <= 0) {
      alert("Ingrese una cantidad válida.");
      return;
    }

    try {
      const endpoint =
        operacion === "agregar"
          ? `http://localhost:5002/api/productos/${id_producto}/aumentar`
          : `http://localhost:5002/api/productos/${id_producto}/disminuir`;

      const response = await axios.patch(endpoint, { cantidad });

      alert(response.data.message);

      // Actualizar el producto en el estado
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id_producto === id_producto ? response.data.producto : producto
        )
      );

      // Verificar alertas de bajo stock
      verificarAlertas(
        productos.map((producto) =>
          producto.id_producto === id_producto ? response.data.producto : producto
        )
      );

      // Limpiar el campo de cantidad
      setCantidadModificar({ ...cantidadModificar, [id_producto]: 0 });
    } catch (err) {
      console.error(`Error al ${operacion === "agregar" ? "aumentar" : "disminuir"} el stock:`, err);
      alert(`Error al ${operacion === "agregar" ? "aumentar" : "disminuir"} el stock.`);
    }
  };

  const handleEditarProducto = async () => {
    if (!productoSeleccionado) return;

    try {
      const response = await axios.put(
        `http://localhost:5002/api/productos/${productoSeleccionado.id_producto}`,
        productoSeleccionado
      );

      alert(response.data.message);

      // Actualizar el producto en el estado
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id_producto === productoSeleccionado.id_producto
            ? response.data.producto
            : producto
        )
      );

      setProductoSeleccionado(null);
      setMostrarModal(false);
    } catch (err) {
      console.error("Error al editar el producto:", err);
      alert("Error al editar el producto.");
    }
  };

  const abrirModal = (producto = null) => {
    setProductoSeleccionado(producto || {
      nombre: "",
      descripcion: "",
      precio_compra: "",
      precio_venta: "",
      stock: "",
      imagen: "",});
    setMostrarModal(true);
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
              <li key={producto.id_producto}>
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
    <tr key={producto.id_producto} className="odd:bg-white even:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
        {/* Imagen redonda */}
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-10 h-10 rounded-full object-cover"
        />
        {producto.nombre}
      </td>
      <td className="border border-gray-300 px-4 py-2">{producto.stock}</td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={cantidadModificar[producto.id_producto] || ""}
            onChange={(e) =>
              setCantidadModificar({
                ...cantidadModificar,
                [producto.id_producto]: parseInt(e.target.value) || 0,
              })
            }
            className="w-20 p-2 border rounded-md"
          />
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-500"
            onClick={() => modificarStock(producto.id_producto, "agregar")}
          >
            Agregar
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
            onClick={() => modificarStock(producto.id_producto, "quitar")}
          >
            Quitar
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
            onClick={() => abrirModal(producto)}
          >
            Editar
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Modal para agregar o editar producto */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {productoSeleccionado?.id_producto ? "Editar Producto" : "Agregar Producto"}
            </h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={productoSeleccionado.nombre}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, nombre: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Descripción</label>
              <textarea
                value={productoSeleccionado.descripcion}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, descripcion: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Precio Compra</label>
              <input
                type="number"
                value={productoSeleccionado.precio_compra}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, precio_compra: parseFloat(e.target.value) })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Precio Venta</label>
              <input
                type="number"
                value={productoSeleccionado.precio_venta}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, precio_venta: parseFloat(e.target.value) })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Stock</label>
              <input
                type="number"
                value={productoSeleccionado.stock}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, stock: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Imagen URL</label>
              <input
                type="text"
                value={productoSeleccionado.imagen}
                onChange={(e) =>
                  setProductoSeleccionado({ ...productoSeleccionado, imagen: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
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
                onClick={handleEditarProducto}
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

export default Inventario;