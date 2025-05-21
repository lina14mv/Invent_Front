import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const Inicio = () => {
  const [resumen, setResumen] = useState({
    totalVentas: 0,
    ingresos: 0,
    productosVendidos: 0,
  });
  const [ventasPorMes, setVentasPorMes] = useState({
    labels: [],
    datasets: [{ label: "Ventas ($)", data: [], backgroundColor: "rgba(75, 192, 192, 0.6)", borderColor: "rgba(75, 192, 192, 1)", borderWidth: 1 }],
  });
  const [productosVendidosData, setProductosVendidosData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
  });

  // Obtener id_negocio desde localStorage (igual que en otras vistas)
  const tipo = localStorage.getItem("tipo");
  const id_usuario = localStorage.getItem("id");
  const id_negocio_local = localStorage.getItem("id");
  const [idNegocioReal, setIdNegocioReal] = useState(null);

  useEffect(() => {
    const obtenerIdNegocio = async () => {
      if (tipo === "usuario") {
        try {
          const res = await axios.get(`http://localhost:5002/api/usuario/${id_usuario}`);
          setIdNegocioReal(res.data.pertenece_negocio);
        } catch (err) {
          setIdNegocioReal(id_negocio_local);
          console.error("Error al obtener el negocio del usuario:", err);
        }
      } else {
        setIdNegocioReal(id_negocio_local);
      }
    };
    obtenerIdNegocio();
  }, [tipo, id_usuario, id_negocio_local]);

  useEffect(() => {
    if (!idNegocioReal) return;
    const fetchFinanzas = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/finanzas/${idNegocioReal}`);
        // Resumen
        setResumen({
          totalVentas: res.data.total_ventas_mes || 0,
          ingresos: res.data.total_ingresos_mes || 0,
          productosVendidos: res.data.cantidad_productos_vendidos_mes || 0,
        });
        // Ventas por mes (puede venir solo un mes, pero soporta varios)
        setVentasPorMes({
          labels: res.data.ventas_por_mes.map((v) => v.mes),
          datasets: [
            {
              label: "Ventas ($)",
              data: res.data.ventas_por_mes.map((v) => Number(v.total_ingresos)),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
        // Top 5 productos
        setProductosVendidosData({
          labels: res.data.top_5_productos.map((p) => p.nombre),
          datasets: [
            {
              data: res.data.top_5_productos.map((p) => Number(p.cantidad_vendida)),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
          ],
        });
      } catch (err) {
        // Si hay error, deja los datos en cero
        setResumen({ totalVentas: 0, ingresos: 0, productosVendidos: 0 });
        setVentasPorMes({
          labels: [],
          datasets: [{ label: "Ventas ($)", data: [], backgroundColor: "rgba(75, 192, 192, 0.6)", borderColor: "rgba(75, 192, 192, 1)", borderWidth: 1 }],
        });
        setProductosVendidosData({
          labels: [],
          datasets: [{ data: [], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
        });
        console.error("Error al cargar las finanzas:", err);
      }
    };
    fetchFinanzas();
  }, [idNegocioReal]);

  return (
    <div className="p-5">
      {/* Resumen de ventas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-700">Total Ventas</h3>
          <p className="text-2xl font-semibold">{resumen.totalVentas}</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-blue-700">Ingresos</h3>
          <p className="text-2xl font-semibold">${resumen.ingresos}</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-yellow-700">Productos Vendidos</h3>
          <p className="text-2xl font-semibold">{resumen.productosVendidos}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfica de barras */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Ventas por Mes</h3>
          <Bar data={ventasPorMes} />
        </div>

        {/* Gráfica de pastel */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Productos Más Vendidos</h3>
          <Pie data={productosVendidosData} />
        </div>
      </div>
    </div>
  );
};

export default Inicio;