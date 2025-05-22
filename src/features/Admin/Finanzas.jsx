import { faMagnifyingGlass, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CerrarSesion } from "../../components/cerrarSesion";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import Notiflix from "notiflix";

const Finanzas = () => {
  const [modal, setModal] = useState(false);
  const [membresia, setMembresia] = useState([]);
  const [grafica, setGrafica] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [title, setTitle] = useState("");
  const [negocios, setNegocios] = useState([]); // Lista de negocios

  const [formData, setFormData] = useState({
    id_empresa: "",
    meses: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/grafica-membresias")
      .then((response) => {
        setGrafica(response.data);
        console.log("Grafica data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/negocios")
      .then((response) => {
        const filtrados = response.data.negocios.filter(
          (negocio) => negocio.activo === false
        );
        setNegocios(filtrados);
        console.log("Negociosss:", filtrados);
      })
      .catch((error) => {
        console.error("Error negocios:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/ver-membresias")
      .then((response) => {
        setMembresia(response.data.membresias);
        console.log("Membresia data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching membership data:", error);
      });
  }, []);

  const Filtradas = useMemo(() => {
    return membresia.filter((emp) => {
      if (!busqueda) return true;
      return emp.nombre_negocio?.toLowerCase().includes(busqueda.toLowerCase());
    });
  }, [membresia, busqueda]);

  const handleModal =
    (id = " ") =>
    () => {
      if (id === "hola") {
        setTitle("Registrar pago");
        setFormData({ id_empresa: "", meses: "" });
        setModal(true);
        return;
      }
      setTitle("Renovar membresia");
      setFormData({ id_empresa: id, meses: "" });
      setModal(true);
    };

  const rows = useMemo(() => {
    console.log("fil: ", Filtradas);
    return Filtradas.map((emp, idx) => (
      <tr key={idx} className="odd:bg-white even:bg-gray-200">
        <td>{emp.nombre_negocio}</td>
        <td className="">
          {emp.fecha_fin
            ? new Date(emp.fecha_fin).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : ""}
        </td>
        <td>
          <button
            onClick={handleModal(emp.id_negocio)}
            className="bg-green-400 text-white px-2 rounded m-1 text-sm hover:bg-green-600"
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        </td>
      </tr>
    ));
  }, [Filtradas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos obligatorios
    if (title === "Registrar pago" && !formData.id_empresa) {
      Notiflix.Notify.failure("Selecciona una empresa");
      return;
    }
    if (!formData.meses) {
      Notiflix.Notify.failure("El campo 'Meses' es obligatorio");
      return;
    }
    if (isNaN(Number(formData.meses)) || Number(formData.meses) <= 0) {
      Notiflix.Notify.failure("El campo 'Meses' debe ser un número mayor a 0");
      return;
    }
    if (title === "Renovar membresia") {
      try {
        await axios.post("http://localhost:5002/api/renovar-membresia", {
         id_negocio: formData.id_empresa,
          meses: formData.meses,
        });
        console.log("Datos enviados:", formData);
        setModal(false);
        setFormData({
          id_empresa: "",
          meses: "",
        });
        Notiflix.Notify.success("Pago registrado");
        const response = await axios.get("http://localhost:5002/api/ver-membresias");
        setMembresia(response.data.membresias);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        Notiflix.Notify.failure("Pago no registrado: ", error);
      }
    }
    if (title === "Registrar pago") {
      try {
        await axios.post("http://localhost:5002/api/crear-membresia", {
          id_negocio: formData.id_empresa,
          meses: formData.meses,
        });
        console.log("Datos enviados:", formData);
        setModal(false);
        setFormData({
          id_empresa: "",
          meses: "",
        });
        Notiflix.Notify.success("Pago registrado");
        const response = await axios.get("http://localhost:5002/api/ver-membresias");
        setMembresia(response.data.membresias);
        // Primero actualizar el campo activo en la base de datos
        await axios.post("http://localhost:5002/api/actualizar-activo-negocios");
        // Luego volver a consultar los negocios filtrados
        const negociosResponse = await axios.get("http://localhost:5002/api/negocios");
        const filtrados = negociosResponse.data.negocios.filter(
          (negocio) => negocio.activo === false
        );
        setNegocios(filtrados);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        Notiflix.Notify.failure("Pago no registrado: ", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Finanzas</h1>
        <div className="flex gap-8 items-center">
          <button
            className="bg-green-500 rounded-md p-1 hover:cursor-pointer w-50 right-0 my-5"
            onClick={handleModal("hola")}
          >
            Nuevo pago
          </button>
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
          <CerrarSesion />
        </div>
      </div>
      <div className="mt-8 flex justify-between gap-6">
        <table className="table-fixed text-center border-separate border-r-1 pr-2">
          <thead className="border">
            <tr className="bg-green-200">
              <th className="w-44">Negocio</th>
              <th className="w-32">Fecha Limite</th>
              <th className="bg-white"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {rows?.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="justify-center flex-1">
          <Bar
            data={{
              labels: grafica.map((item) => item.mes),
              datasets: [
                {
                  label: "Ganancia",
                  data: grafica.map((item) => Number(item.ganancias)),
                  backgroundColor: "rgba(34,197,94,0.7)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Ganancias por Mes" },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
                    },
                  },
                  suggestedMax: 2500000,
                },
              },
            }}
          />
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h1 className="text-lg font-semibold">{title}</h1>
            <form className="mt-2" onSubmit={handleSubmit}>
              {title === "Registrar pago" && (
                <>
                  <h3 className="text-base mb-2">ID de empresa:</h3>
                  <select
                    value={formData.id_empresa}
                    onChange={(e) =>
                      setFormData({ ...formData, id_empresa: e.target.value })
                    }
                    className="mb-3 w-full border p-1"
                  >
                    <option value="">Selecciona una empresa</option>
                    {negocios.map((negocio, idx) => (
                      <option key={idx} value={negocio.id_negocio}>
                        {negocio.nombre_negocio}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <h3 className="text-base mb-2">Meses:</h3>
              <input
                type="number"
                placeholder="Meses"
                value={formData.meses}
                onChange={(e) =>
                  setFormData({ ...formData, meses: e.target.value })
                }
                className="mb-3 w-full border p-1"
              />
              <div className="flex justify-end gap-2 mt-4">
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
    </>
  );
};

export default Finanzas;
