import {
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Notiflix from "notiflix";

const Empresas = () => {
  const [modal, setModal] = useState(false);

  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [ubicacionFiltro, setUbicacionFiltro] = useState("");

  const [busqueda, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    ubicacion_ciudad: "",
    ubicacion_departamento: "",
    direccion: "",
    telefono: "",
    correo: "",
    tipo_negocio: "empresa",
    nombre_dueno: "",
    cedula_dueno: "",
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

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

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento"
        );
        const departamentosUnicos = response.data
          .map((d) => d.departamento)
          .sort();
        setDepartamentos(departamentosUnicos);
      } catch (error) {
        console.error("Error al obtener departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, []);

  useEffect(() => {
    if (!formData.ubicacion_departamento) return;

    const fetchCiudades = async () => {
      try {
        const response = await axios.get(
          `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${encodeURIComponent(
            formData.ubicacion_departamento
          )}`
        );
        const ciudadesUnicas = [
          ...new Set(response.data.map((item) => item.municipio)),
        ].sort();
        setCiudades(ciudadesUnicas);
      } catch (error) {
        console.error("Error al obtener ciudades:", error);
      }
    };

    fetchCiudades();
  }, [formData.ubicacion_departamento]);

  const ubicaciones = useMemo(() => {
    const lista = empresas.map((emp) => emp.ubicacion_ciudad) ?? [];
    return Array.from(new Set(lista));
  }, [empresas]);

  const normalizar = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = {
      nombre: formData.nombre,
      nit: formData.nit,
      direccion: formData.direccion,
      telefono: formData.telefono,
      correo: formData.correo,
      ubicacion_ciudad: `${formData.ubicacion_ciudad}, ${formData.ubicacion_departamento}`,
      tipo_negocio: "empresa",
      nombre_dueno: formData.nombre_dueno,
      cedula_dueno: formData.cedula_dueno,
      creado_por: "1",
    };

    try {
      const response = await axios.post(
        "http://localhost:5002/negocios/registrar",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Notiflix.Notify.success("Empresa registrada!");
      setModal(false);
      setFormData({
        nombre: "",
        nit: "",
        ubicacion_ciudad: "",
        ubicacion_departamento: "",
        direccion: "",
        telefono: "",
        correo: "",
        tipo_negocio: "empresa",
        nombre_dueno: "",
        cedula_dueno: "",
      });
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Error al registrar empresa!");
    }
  };

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
      <div className="flex my-5 gap-3 justify-between">
        <div className="flex my-5 gap-3 ">
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
        <button
          className="bg-green-500 rounded-md px-2 hover:cursor-pointer w-32 right-0 my-5"
          onClick={() => setModal(true)}
        >
          Nueva empresa
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

        {modal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                Registrar nueva empresa
              </h2>
              <form onSubmit={handleSubmit}>
                <h3 className="text-base font-semibold mb-2">Datos empresa:</h3>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="mb-2 w-full border p-1"
                />
                <input
                  type="number"
                  placeholder="Nit"
                  value={formData.nit}
                  onChange={(e) =>
                    setFormData({ ...formData, nit: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <input
                  type="number"
                  placeholder="Telefono"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <input
                  type="text"
                  placeholder="Correo"
                  value={formData.correo}
                  onChange={(e) =>
                    setFormData({ ...formData, correo: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <select
                  value={formData.ubicacion_departamento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ubicacion_departamento: e.target.value,
                      ubicacion_ciudad: "",
                    })
                  }
                  className="mb-3 w-full border p-2"
                >
                  <option value="">Selecciona un departamento</option>
                  {departamentos.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.ubicacion_ciudad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ubicacion_ciudad: e.target.value,
                    })
                  }
                  className="mb-3 w-full border p-2"
                  disabled={!formData.ubicacion_departamento}
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Dirección"
                  value={formData.direccion}
                  onChange={(e) =>
                    setFormData({ ...formData, direccion: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <h3 className="text-base font-semibold mb-2">
                  Datos propietario:
                </h3>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre_dueno}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre_dueno: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <input
                  type="number"
                  placeholder="Cedula"
                  value={formData.cedula_dueno}
                  onChange={(e) =>
                    setFormData({ ...formData, cedula_dueno: e.target.value })
                  }
                  className="mb-3 w-full border p-1"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Empresas;
