import React, { useState, useEffect } from "react";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const Finanzas = () => {
  const [finanzas, setFinanzas] = useState({
    ingresos: 0,
    egresos: 0,
    balance: 0,
  });

  const [graficaIngresosEgresos, setGraficaIngresosEgresos] = useState({});
  const [graficaMensual, setGraficaMensual] = useState({});

  useEffect(() => {
    // Simulación de datos de ejemplo
    const fetchFinanzas = async () => {
      try {
        const datosFinancieros = {
          ingresos: 50000,
          egresos: 30000,
          balance: 20000,
          ingresosMensuales: [8000, 7000, 9000, 10000, 12000],
          egresosMensuales: [4000, 5000, 6000, 7000, 8000],
        };

        setFinanzas({
          ingresos: datosFinancieros.ingresos,
          egresos: datosFinancieros.egresos,
          balance: datosFinancieros.balance,
        });

        // Configuración de la gráfica de ingresos vs egresos
        setGraficaIngresosEgresos({
          labels: ["Ingresos", "Egresos"],
          datasets: [
            {
              data: [datosFinancieros.ingresos, datosFinancieros.egresos],
              backgroundColor: ["#36A2EB", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        });

        // Configuración de la gráfica mensual
        setGraficaMensual({
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Ingresos",
              data: datosFinancieros.ingresosMensuales,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Egresos",
              data: datosFinancieros.egresosMensuales,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error al cargar los datos financieros:", err);
      }
    };

    fetchFinanzas();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Reportes Financieros</h1>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-700">Ingresos</h3>
          <p className="text-2xl font-semibold">${finanzas.ingresos}</p>
        </div>
        <div className="bg-red-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-red-700">Egresos</h3>
          <p className="text-2xl font-semibold">${finanzas.egresos}</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-blue-700">Balance</h3>
          <p className="text-2xl font-semibold">${finanzas.balance}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfica de ingresos vs egresos */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Ingresos vs Egresos</h3>
          <Pie data={graficaIngresosEgresos} />
        </div>

        {/* Gráfica mensual */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Ingresos y Egresos Mensuales</h3>
          <Bar data={graficaMensual} />
        </div>
      </div>
    </div>
  );
};

export default Finanzas;