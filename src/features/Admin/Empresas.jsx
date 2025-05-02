import {
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [ubicacionFiltro, setUbicacionFiltro] = useState("");

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/negocios")
      .then((response) => {
        console.log("res ", response.data.negocios);
        setEmpresas(response.data.negocios);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const ubicaciones = useMemo(() => {
    const lista = empresas.map((emp) => emp.ubicacion_ciudad) ?? [];
    return Array.from(new Set(lista));
  }, [empresas]);

  const normalizar = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const empresasFiltradas = useMemo(() => {
    let lista = empresas ?? [];

    if (estadoFiltro === "1") {
      lista = lista.filter((emp) => emp.activo === true);
    } else if (estadoFiltro === "2") {
      lista = lista.filter((emp) => emp.activo === false);
    }

    if (ubicacionFiltro.trim() !== "") {
      lista = lista.filter((emp) => emp.ubicacion_ciudad === ubicacionFiltro);
    }

    if (busqueda.trim() !== "") {
      lista = lista.filter((emp) =>
        normalizar(emp.nombre_negocio).includes(normalizar(busqueda))
      );
    }

    return lista;
  }, [empresas, estadoFiltro, ubicacionFiltro, busqueda]);

  const rows = useMemo(() => {
    return empresasFiltradas.map((emp, idx) => (
      <tr key={idx} className="odd:bg-white even:bg-gray-200">
        <td>{emp.nombre_negocio}</td>
        <td className="w-80">{emp.correo}</td>
        <td>{emp.activo ? "Activo" : "Inactivo"}</td>
        <td>{emp.telefono}</td>
        <td>{emp.ubicacion_ciudad}</td>
        <td>{emp.direccion}</td>
        <td>{emp.cantidad_productos}</td>
        <td>{emp.cantidad_trabajadores}</td>
        <td>{emp.total_ventas_mes}</td>
      </tr>
    ));
  }, [empresasFiltradas]);

  if (loading) {
    return (
      <>
        <h1 className="text-2xl italic font-bold">Loading ....</h1>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Empresas</h1>
        <div className="flex gap-8 items-center">
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-black"
              />
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <i>
            <FontAwesomeIcon icon={faCircleUser} className="text-4xl" />
          </i>
        </div>
      </div>
      <div className="flex my-5 gap-3">
        <select
          className="bg-gray-100 border-gray-300 rounded-md"
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
        >
          <option value="0">Estado</option>
          <option value="1">Activo</option>
          <option value="2">Inactivo</option>
        </select>
        <select
          className="bg-gray-100 border-gray-300 rounded-md p-2"
          value={ubicacionFiltro}
          onChange={(e) => setUbicacionFiltro(e.target.value)}
        >
          <option value="">Ubicación</option>
          {ubicaciones.map((ubi, idx) => (
            <option key={idx} value={ubi}>
              {ubi}
            </option>
          ))}
        </select>

        <button
          className="bg-red-500 rounded-md px-2 hover:cursor-pointer"
          onClick={() => {
            setEstadoFiltro("");
            setUbicacionFiltro("");
            setBusqueda("");
          }}
        >
          Borrar filtros
        </button>
      </div>
      <div className="mt-3">
        <table className="table-fixed w-full text-center border-separate">
          <thead className="border">
            <tr className="bg-green-200">
              <th className="">Nombre</th>
              <th className="w-64">Correo</th>
              <th className="">Estado</th>
              <th className="">Telefono</th>
              <th className="">Ubicacion</th>
              <th className="">Dirección</th>
              <th className="">#Productos</th>
              <th className="">#Trabajadores</th>
              <th className="">Ventas/mes</th>
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

export default Empresas;
