import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CatalogoPage = () => {
  const [empresa, setEmpresa] = useState(null);
  const [logo, setLogo] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        // Reemplaza el ID con el valor almacenado en localStorage si es necesario
        const idEmpresa = 1; // Por ahora está fijo, luego puedes usar localStorage.getItem('id_empresa')
        const response = await axios.get(`http://localhost:5002/api/productos/${idEmpresa}`);
        setEmpresa(response.data.nombre);
        setLogo(response.data.imagen); // Guardar el logo de la empresa
        setProductos(response.data.productos);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el catálogo. Por favor, intenta nuevamente.');
      }
    };

    fetchCatalogo();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="p-5">
      {/* Encabezado del catálogo */}
      <div className="text-center mb-10">
        {logo && (
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo de la empresa"
              className="w-20 h-20 object-contain rounded-full border border-gray-300"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-green-700">{empresa}</h1>
        {empresa && <h2 className="text-xl font-semibold text-gray-600 mt-2">Catálogo de Productos</h2>}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos
          .filter((producto) => producto.disponibilidad === 'Disponible') // Filtrar productos disponibles
          .map((producto) => (
            <div
              key={producto.id_producto}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Imagen del producto */}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-40 object-cover"
              />
              {/* Detalles del producto */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
                <p className="text-lg font-semibold text-green-700 mt-2">
                  ${producto.precio_venta}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CatalogoPage;