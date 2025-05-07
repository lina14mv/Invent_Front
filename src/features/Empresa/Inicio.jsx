import React from "react";
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

const Inicio = () => {
  // Datos de ejemplo para el resumen
  const resumenVentas = {
    totalVentas: 150,
    ingresos: 12500,
    productosVendidos: 320,
  };

  // Datos de ejemplo para productos más vendidos
  const productosMasVendidos = [
    { nombre: "Producto A", cantidad: 120 },
    { nombre: "Producto B", cantidad: 95 },
    { nombre: "Producto C", cantidad: 75 },
  ];

  // Datos para la gráfica de barras (ventas por mes)
  const ventasPorMes = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ventas ($)",
        data: [2000, 3000, 2500, 4000, 3500],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Datos para la gráfica de pastel (productos más vendidos)
  const productosVendidosData = {
    labels: productosMasVendidos.map((producto) => producto.nombre),
    datasets: [
      {
        data: productosMasVendidos.map((producto) => producto.cantidad),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-5">
      {/* Resumen de ventas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-green-700">Total Ventas</h3>
          <p className="text-2xl font-semibold">{resumenVentas.totalVentas}</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-blue-700">Ingresos</h3>
          <p className="text-2xl font-semibold">${resumenVentas.ingresos}</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold text-yellow-700">Productos Vendidos</h3>
          <p className="text-2xl font-semibold">{resumenVentas.productosVendidos}</p>
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