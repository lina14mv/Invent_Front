import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CatalogoPage = () => {
  const { id_negocio } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [logo, setLogo] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCatalogo = async () => {
      if (!id_negocio) {
        setError("No se encontró el ID del negocio en la URL.");
        return;
      }

      try {
        const response = await axios.get(
          `http://3.144.253.195/api/productos/${id_negocio}`
        );
        setEmpresa(response.data.nombre);
        setLogo(response.data.imagen);
        setProductos(response.data.productos);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el catálogo. Por favor, intenta nuevamente.");
      }
    };

    fetchCatalogo();
  }, [id_negocio]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="p-5 min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Encabezado del catálogo */}
      <div className="text-center mb-10">
        {logo && (
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo de la empresa"
              className="w-24 h-24 object-contain bg-white rounded-full border-2 border-green-500 shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl font-extrabold text-green-700">
          {empresa}
        </h1>
        {empresa && (
          <h2 className="text-2xl font-semibold text-gray-600 mt-2">
            Catálogo de Productos
          </h2>
        )}
        <div className="w-24 h-1 bg-green-400 mx-auto mt-4 rounded"></div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos
          .filter((producto) => producto.disponibilidad === "Disponible")
          .map((producto) => (
            <div
              key={producto.id_producto}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
            >
              {/* Imagen del producto */}
              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-32 object-cover"
                />
                <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                  Disponible
                </span>
              </div>
              {/* Detalles del producto */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {producto.nombre}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex-1">
                  {producto.descripcion}
                </p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${Number(producto.precio_venta).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400">
                    Stock: {producto.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CatalogoPage;
