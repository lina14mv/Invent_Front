
import { CardInfo } from "../../shared/Card";
import { faBuildingCircleCheck, faCircleUser, faLayerGroup, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CerrarSesion } from "../../components/cerrarSesion";

const Inicio = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const num_empresas = data.negocios?.empresa ?? 0;
  const num_usuarios = data.cantidadUsuarios ?? 0;
  const num_ventas = data.cantidadVentas ?? 0;
  const num_productos = data.cantidadProductos ?? 0;

  useEffect(() => {
    axios
      .get("http://3.144.253.195/api/consultaInicial")
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const rows = useMemo(() => {
    return data.datosNegocios?.map((emp, idx) => (
      <tr key={idx} className="odd:bg-white even:bg-gray-200">
        <td>{emp.nombre_negocio}</td>
        <td>{emp.activo ? "Activo" : "Inactivo"}</td>
        <td>{emp.ubicacion_ciudad}</td>
        <td>{emp.telefono}</td>
        <td>{emp.total_ventas_ultimo_mes}</td>
      </tr>
    ));
  }, [data.datosNegocios]);

  if (loading) {
    const constraintsRef = useRef < HTMLDivElement > null;
    return (
      <motion.div ref={constraintsRef} className="w-100 h-100">
        <motion.div drag className="text-center mt-10 text-xl">
          .............
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">¡Hola Admin!</h1>
        <CerrarSesion />
      </div>

      <div className="flex px-6 justify-evenly py-8">
        <CardInfo
          icon={faBuildingCircleCheck}
          num={num_empresas}
          description="Empresas registradas"
        />
        <CardInfo
          icon={faCircleUser}
          num={num_usuarios}
          description="Usuarios registrados"
        />
        <CardInfo
          icon={faLayerGroup}
          num={num_productos}
          description="Productos registrados"
        />
        <CardInfo
          icon={faCartShopping}
          num={num_ventas}
          description="Ventas registradas"
        />
      </div>

      <div className="mt-3">
        <table className="table-fixed w-full text-center border-separate">
          <thead className="border">
            <tr className="bg-green-200">
              <th className="py-2">Nombre</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Teléfono</th>
              <th>Ventas último mes</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {rows?.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inicio;
