import React, { useState, useEffect } from "react";
import axios from "axios";
import Notiflix from "notiflix";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio_compra: "",
    precio_venta: "",
    stock: "",
    imagen_url: "",
  });
  const [imagen, setImagen] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [idNegocioReal, setIdNegocioReal] = useState(null);

  const tipo = localStorage.getItem("tipo");
  const id_usuario = localStorage.getItem("id");
  const id_negocio_local = localStorage.getItem("id");

  useEffect(() => {
    const obtenerIdNegocio = async () => {
      if (tipo === "usuario") {
        try {
          const res = await axios.get(
            `http://3.144.253.195/api/usuario/${id_usuario}`
          );
          // Ajusta el campo según tu backend, por ejemplo: pertenece_negocio
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

  useEffect(() => {
    if (!idNegocioReal) return; // Esperar a que se obtenga el ID del negocio
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          //'http://3.144.253.195/api/productos/1',
          `http://3.144.253.195/api/productos/${idNegocioReal}` // Usar el ID en la ruta
        );

        // Extraer el array de productos de la respuesta
        if (response.data && Array.isArray(response.data.productos)) {
          setProductos(response.data.productos);
        } else {
          console.error(
            "La respuesta de la API no contiene un array de productos:",
            response.data
          );
          setProductos([]);
        }
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setProductos([]);
      }
    };

    fetchProductos();
  }, [idNegocioReal]);

  const subirImagenACloudinary = async () => {
    if (!imagen) return null;

    const formData = new FormData();
    formData.append("file", imagen);
    formData.append("upload_preset", "invent++"); // Reemplaza con tu upload preset de Cloudinary

    try {
      setSubiendoImagen(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/deucbjygt/image/upload", // Reemplaza con tu URL de Cloudinary
        formData
      );
      setSubiendoImagen(false);
      return response.data.secure_url;
    } catch (error) {
      setSubiendoImagen(false);
      console.error("Error al subir la imagen a Cloudinary:", error);
      return null;
    }
  };

  const handleAgregarProducto = async () => {
    // Obtener el ID del negocio desde el localStorage
    if (!idNegocioReal) {
      Notiflix.Notify.failure(
        "No se encontró el ID del negocio en el localStorage."
      );
      return;
    }

    const imagenUrl = await subirImagenACloudinary();
    if (!imagenUrl) {
      Notiflix.Notify.failure("Error al subir la imagen. Intenta nuevamente.");
      return;
    }

    const productoData = {
      ...nuevoProducto,
      id_negocio: idNegocioReal,
      imagen_url: imagenUrl,
    };

    try {
      const response = await axios.post(
        "http://3.144.253.195/api/registrarProductos",
        productoData
      );
      if (response.status === 201) {
        // Actualizar la lista de productos con el nuevo producto
        setProductos([...productos, response.data]);
        setMostrarModal(false);
        setNuevoProducto({
          nombre: "",
          descripcion: "",
          precio_compra: "",
          precio_venta: "",
          stock: "",
          imagen_url: "",
        });
        setImagen(null);
        Notiflix.Notify.success("Producto registrado exitosamente.");
      }
    } catch (err) {
      console.error("Error al registrar el producto:", err);
      Notiflix.Notify.failure("Ocurrió un error al registrar el producto.");
    }
  };

  const handleCopiarEnlace = () => {
    const isProduction = window.location.hostname === "d2oip7dtxebx8q.cloudfront.net";
    const dominio = isProduction
      ? "http://d2oip7dtxebx8q.cloudfront.net"
      : window.location.origin; 
    const url = `${dominio}/Catalogo/${idNegocioReal}`;
    navigator.clipboard.writeText(url);
    Notiflix.Notify.success("¡Enlace del catálogo copiado al portapapeles!");
  };
  const productosFiltrados = productos.filter((producto) => {
    const cumpleEstado = filtroEstado
      ? producto.disponibilidad === filtroEstado
      : true;
    return cumpleEstado;
  });

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 mouse-pointer"
          onClick={() => setMostrarModal(true)}
        >
          Agregar Producto
        </button>

        <a
          href={`/Catalogo/${idNegocioReal}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center justify-center mouse-pointer"
        >
          Ver Catálogo
        </a>

        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 mouse-pointer"
          onClick={handleCopiarEnlace}
        >
          Compartir enlace catálogo
        </button>
      </div>
      {/* Filtros */}
      <div className="flex gap-4 mb-5">
        <select
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </select>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
          onClick={() => {
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
            <th className="border border-gray-300 px-4 py-2">Precio Compra</th>
            <th className="border border-gray-300 px-4 py-2">Precio Venta</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Disponibilidad</th>
            <th className="border border-gray-300 px-4 py-2">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr
              key={producto.id_producto}
              className="odd:bg-white even:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                {producto.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.descripcion}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${producto.precio_compra}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${producto.precio_venta}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.stock}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {producto.disponibilidad}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar producto */}
      {mostrarModal && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto border border-green-600">
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
                  setNuevoProducto({
                    ...nuevoProducto,
                    descripcion: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">
                  Precio Compra
                </label>
                <input
                  type="number"
                  value={nuevoProducto.precio_compra}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      precio_compra: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Precio Venta</label>
                <input
                  type="number"
                  value={nuevoProducto.precio_venta}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      precio_venta: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">Stock</label>
                <input
                  type="number"
                  value={nuevoProducto.stock}
                  onChange={(e) =>
                    setNuevoProducto({
                      ...nuevoProducto,
                      stock: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Imagen</label>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                  className="w-full p-2 border rounded-md"
                />
              </div>
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
                disabled={subiendoImagen}
              >
                {subiendoImagen ? "Subiendo..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
