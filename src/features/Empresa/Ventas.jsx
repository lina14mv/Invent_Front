import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Notiflix from "notiflix";

const Ventas = () => {
  const [vista, setVista] = useState("ventas"); // "ventas" o "clientes"
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [idNegocioReal, setIdNegocioReal] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroProducto, setFiltroProducto] = useState("");
  const [mostrarModalVenta, setMostrarModalVenta] = useState(false);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [mostrarDetalleVenta, setMostrarDetalleVenta] = useState(false);
  const [detalleVenta, setDetalleVenta] = useState(null);
  const [productosVenta, setProductosVenta] = useState([]);
  const [descuento, setDescuento] = useState(0);
  const [ventasPagina, setVentasPagina] = useState(1);
  const ventasPorPagina = 10;
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente_id: "",
  });
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    tipo_cliente: "minorista",
  });

  const tipo = localStorage.getItem("tipo");
  const id_usuario = Number(localStorage.getItem("id"));
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
    if (!idNegocioReal) return;

    const fetchVentas = async () => {
      try {
        const response = await axios.get(
          `http://3.144.253.195/api/ventas/${idNegocioReal}`
        );
        setVentas(response.data);
      } catch (err) {
        console.error("Error al cargar las ventas:", err);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          `http://3.144.253.195/api/clientes/${idNegocioReal}`
        );
        setClientes(response.data);
        console.log("Clientes:", response.data);
      } catch (err) {
        console.error("Error al cargar los clientes:", err);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://3.144.253.195/api/productos/${idNegocioReal}`
        );
        // Si la respuesta es un objeto con la propiedad productos:
        setProductos(response.data.productos || []); // <-- Cambia esto
        console.log("Productos:", response.data.productos || []);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchVentas();
    fetchClientes();
    fetchProductos();
  }, [idNegocioReal]);

  useEffect(() => {
    console.log("🟡 Productos en venta:", productosVenta);
  }, [productosVenta]);

  useEffect(() => {
    console.log("🟢 Detalle de venta cargado:", detalleVenta);
  }, [detalleVenta]);

  // Filtros
  const ventasFiltradas = ventas.filter((venta) => {
    const cumpleFecha = filtroFecha
      ? venta.fecha_venta && venta.fecha_venta.startsWith(filtroFecha)
      : true;
    const cumpleCliente = filtroCliente
      ? (venta.cliente_nombre || "")
          .toLowerCase()
          .includes(filtroCliente.toLowerCase())
      : true;
    const cumpleProducto = filtroProducto
      ? (venta.detalle || "")
          .toLowerCase()
          .includes(filtroProducto.toLowerCase())
      : true;
    return cumpleFecha && cumpleCliente && cumpleProducto;
  });
  const ventasMostradas = ventasFiltradas.slice(
    0,
    ventasPagina * ventasPorPagina
  );
  const hayMasVentas = ventasFiltradas.length > ventasMostradas.length;

  // Lógica para productos en la venta
  const agregarProductoAVenta = (producto) => {
    setProductosVenta((prev) => {
      const existe = prev.find((p) => p.id_producto === producto.id_producto);
      if (existe) {
        // Si ya existe, sumamos 1 solo si no supera el stock
        if (existe.cantidad < producto.stock) {
          return prev.map((p) =>
            p.id_producto === producto.id_producto
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          );
        }
        return prev; // No sumar si supera el stock
      }
      // Si no existe, lo agregamos con cantidad 1 y aseguramos id_producto
      return [
        ...prev,
        {
          ...producto,
          id_producto: producto.id_producto, // Asegura que esté presente
          cantidad: 1,
        },
      ];
    });
  };

  const actualizarCantidad = (id_producto, cantidad) => {
    setProductosVenta((prev) =>
      prev.map((p) =>
        p.id_producto === id_producto
          ? { ...p, cantidad: Math.max(1, Math.min(cantidad, p.stock)) }
          : p
      )
    );
  };

  const eliminarProducto = (id_producto) => {
    setProductosVenta((prev) =>
      prev.filter((p) => p.id_producto !== id_producto)
    );
  };

  const totalVenta = productosVenta.reduce(
    (acc, p) => acc + p.precio_venta * p.cantidad,
    0
  );
  const totalNeto =
    totalVenta - (totalVenta * (parseFloat(descuento) || 0)) / 100;

  // Crear venta
  const handleRealizarVenta = async () => {
    if (!nuevaVenta.cliente_id || productosVenta.length === 0) return;
    try {
      await axios.post("http://3.144.253.195/api/crear-venta", {
        id_negocio: idNegocioReal,
        empleado_id: id_usuario,
        cliente_id: nuevaVenta.cliente_id,
        total_venta: totalVenta,
        total_neto: totalNeto,
        descuento: parseFloat(descuento) || 0,
        productos: productosVenta.map((p) => ({
          id_producto: p.id_producto,
          cantidad: p.cantidad,
          precio_unitario: p.precio_venta,
        })),
      });
      const cliente = clientes.find(
        (c) => String(c.id_cliente) === String(nuevaVenta.cliente_id)
      );
      await generarPDFVenta(
        {
          total_venta: totalVenta,
          total_neto: totalNeto,
          descuento: parseFloat(descuento) || 0,
        },
        productosVenta,
        cliente,
        idNegocioReal
      );
      setMostrarModalVenta(false);
      setProductosVenta([]);
      setDescuento(0);
      setNuevaVenta({ cliente_id: "" });
      // Recargar ventas
      const response = await axios.get(
        `http://3.144.253.195/api/ventas/${idNegocioReal}`
      );
      setVentas(response.data);
    } catch (error) {
      ("Error al registrar la venta." + error.message);
      console.error(error);
    }
  };

  const generarPDFVenta = async (venta, productosVenta, cliente, id_negocio) => {
    try {
      const response = await axios.get(
        `http://3.144.253.195/api/negocio/${id_negocio}`
      );
      const empresa = response.data;
      const nombreEmpresa = empresa.nombre || "Nombre de la Empresa";
      const direccionEmpresa = empresa.direccion || "Dirección de la Empresa";
      const telefonoEmpresa = empresa.telefono || "Teléfono de la Empresa";
      const correoEmpresa = empresa.correo || "Correo de la Empresa";
      const logoEmpresa = empresa.logo || "";
      const colorPrimario = empresa.color_primario || "#2ecc71";

      const doc = new jsPDF();

      // Header background - hazlo más alto para que no corte texto
      doc.setFillColor(colorPrimario);
      doc.rect(0, 0, 210, 40, "F");

      // Logo empresa
      if (logoEmpresa) {
        try {
          doc.addImage(logoEmpresa, "JPEG", 165, 8, 30, 24);
        } catch {
          console.error("Error al cargar la imagen del logo:", logoEmpresa);
        }
      }

      // Título
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("Factura de Venta", 14, 20);

      // Información empresa - separa un poco más verticalmente y con más margen izquierdo
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(nombreEmpresa, 14, 28);
      doc.text(direccionEmpresa, 14, 34);
      doc.text(`Teléfono: ${telefonoEmpresa}`, 80, 34);
      doc.text(`Correo: ${correoEmpresa}`, 145, 36);

      // Línea divisoria - baja la posición para que no se encime con el texto
      doc.setDrawColor(colorPrimario);
      doc.setLineWidth(0.8);
      doc.line(14, 42, 196, 42);

      // Datos cliente y fecha - bajar también
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Cliente: ${cliente?.nombre || ""}`, 14, 52);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 52);

      let y = 60;
      doc.setFillColor(colorPrimario);
      doc.setFont("helvetica", "bold");
      doc.rect(10, y, 190, 8, "F");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text("Nombre", 12, y + 6);
      doc.text("Cantidad", 85, y + 6);
      doc.text("Precio", 125, y + 6);
      doc.text("Subtotal", 165, y + 6);

      // Tabla productos rows
      y += 12;
      doc.setTextColor(0, 0, 0);
      productosVenta.forEach((p) => {
        // Limitar ancho del nombre (máx 65mm aprox), cortar y saltar línea si es necesario
        const maxWidth = 65;
        const nombreLines = doc.splitTextToSize(p.nombre, maxWidth);
        let lineY = y;
        nombreLines.forEach((line, idx) => {
          doc.text(line, 12, lineY);
          // Solo la primera línea lleva los otros datos
          if (idx === 0) {
            doc.text(String(p.cantidad), 85, lineY, { align: "center" });
            doc.text(
              p.precio_unitario !== undefined && p.precio_unitario !== null
                ? `$${parseFloat(p.precio_unitario).toFixed(2)}`
                : `$${parseFloat(p.precio_venta).toFixed(2)}`,
              125,
              lineY,
              { align: "center" }
            );
            const subtotal = p.cantidad * (parseFloat(p.precio_unitario) || parseFloat(p.precio_venta));
            doc.text(`$${subtotal.toFixed(2)}`, 165, lineY, {
              align: "center",
            });
          }
          lineY += 8;
        });
        y = lineY;
      });

      // Línea divisoria antes totales
      y += 4;
      doc.setDrawColor(colorPrimario);
      doc.setLineWidth(0.6);
      doc.line(14, y, 196, y);
      y += 10;

      // Totales - también baja un poco el espacio
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(colorPrimario);

      doc.text(`Total: $${Number(venta.total_venta).toFixed(2)}`, 14, y);
      y += 10;
      doc.text(
        `Descuento: $${Number(venta.descuento || 0).toFixed(2)}%`,
        14,
        y
      );
      y += 10;
      doc.text(`Total Neto: $${Number(venta.total_neto).toFixed(2)}`, 14, y);

      // Nombre archivo personalizado
      const fechaString = new Date().toLocaleDateString().replace(/\//g, "-");
      const clienteNombre = cliente?.nombre?.replace(/\s+/g, "_") || "cliente";
      const fileName = `Factura_${clienteNombre}_${fechaString}.pdf`;

      doc.save(fileName);
    } catch (error) {
      console.error("Error al generar el PDF de la venta:", error);
    }
  };

  // Crear cliente
  const handleCrearCliente = async () => {
    try {
      await axios.post("http://3.144.253.195/api/crear-cliente", {
        ...nuevoCliente,
        id: tipo === "negocio" ? idNegocioReal : id_usuario,
        tipo,
      });
      setMostrarModalCliente(false);
      setNuevoCliente({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        tipo_cliente: "minorista",
      });
      // Recargar clientes
      const response = await axios.get(
        `http://3.144.253.195/api/clientes/${idNegocioReal}`
      );
      setClientes(response.data);
    } catch (err) {
      Notiflix.Notify.failure("Error al crear el cliente.");
      console.error(err);
    }
  };

  // Ver detalles de venta
  const verDetalleVenta = async (venta) => {
    try {
      const response = await axios.get(
        `http://3.144.253.195/api/detalle-venta/${venta.id_venta}`
      );

      // Ajuste según respuesta del backend
      const productos = Array.isArray(response.data)
        ? response.data
        : response.data.productos;

      setDetalleVenta({ ...venta, productos });
      setMostrarDetalleVenta(true);
    } catch (err) {
      Notiflix.Notify.failure("Error al cargar detalles de la venta.");
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <div className="flex gap-4 mb-5">
        <button
          className={`px-4 py-2 rounded-md cursor-pointer font-bold ${
            vista === "ventas"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setVista("ventas")}
        >
          Ventas
        </button>
        <button
          className={`px-4 py-2 rounded-md cursor-pointer font-bold ${
            vista === "clientes"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setVista("clientes")}
        >
          Clientes
        </button>
      </div>

      {vista === "ventas" && (
        <>
          <h1 className="text-2xl font-bold mb-5">Gestión de Ventas</h1>
          {/* Filtros */}
          <div className="flex gap-4 mb-5 justify-between">
            <input
              type="date"
              className="bg-gray-100 border-gray-300 rounded-md p-2"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
            />
            <input
              type="text"
              placeholder="Buscar por cliente"
              className="bg-gray-100 border-gray-300 rounded-md p-2"
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
            />

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-400"
              onClick={() => {
                setFiltroFecha("");
                setFiltroCliente("");
                setFiltroProducto("");
              }}
            >
              Borrar Filtros
            </button>

            {tipo === "usuario" && (
              <button
                className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-500"
                onClick={() => setMostrarModalVenta(true)}
              >
                Realizar Venta
              </button>
            )}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500"
              onClick={() => setMostrarModalCliente(true)}
            >
              Crear Cliente
            </button>
          </div>

          {/* Tabla de ventas */}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Cliente</th>
                <th className="border border-gray-300 px-4 py-2">Empleado</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Descuento</th>
                <th className="border border-gray-300 px-4 py-2">Total Neto</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventasMostradas.map((venta) => (
                <tr
                  key={venta.id_venta}
                  className="odd:bg-white even:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {venta.fecha_venta?.slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {venta.cliente_nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {venta.empleado_nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${venta.total_venta}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {venta.descuento || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${venta.total_neto}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1  cursor-pointer rounded-md hover:bg-blue-500"
                      onClick={() => verDetalleVenta(venta)}
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {hayMasVentas && (
              <div className="flex justify-center my-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                  onClick={() => setVentasPagina(ventasPagina + 1)}
                >
                  Ver más
                </button>
              </div>
            )}
          </table>
        </>
      )}

      {vista === "clientes" && (
        <>
          <div className="flex  gap-4 mt-5 justify-between mb-5">
            <h1 className="text-2xl font-bold mb-5 ">Clientes</h1>

            <button
              className="bg-blue-600 justify-end text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-500"
              onClick={() => setMostrarModalCliente(true)}
            >
              Crear Cliente
            </button>
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
                <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                <th className="border border-gray-300 px-4 py-2">Dirección</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id_cliente}
                  className="odd:bg-white even:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {cliente.nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {cliente.correo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {cliente.telefono}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {cliente.direccion}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {cliente.tipo_cliente}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Modal para realizar venta */}
      {mostrarModalVenta && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[900px] max-h-[90vh] overflow-y-auto border">
            <h2 className="text-xl font-bold mb-4">Realizar Venta</h2>
            {/* Selección de cliente */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Cliente</label>
              <select
                value={nuevaVenta.cliente_id}
                onChange={(e) =>
                  setNuevaVenta({ ...nuevaVenta, cliente_id: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            {/* Tabla de productos */}
            <div className="mb-4 ">
              <label className="block font-semibold mb-2">Productos</label>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1">Imagen</th>
                    <th className="border px-2 py-1">Nombre</th>
                    <th className="border px-2 py-1">Precio</th>
                    <th className="border px-2 py-1">Cantidad</th>
                  </tr>
                </thead>
<tbody>
  {productos.map((prod) => {
    const enVenta = productosVenta.find(
      (p) => p.id_producto === prod.id_producto
    );
    const cantidad = enVenta ? enVenta.cantidad : 1;
    const sinStock = prod.stock === 0;
    return (
      <tr key={prod.id_producto}>
        <td className="border px-2 py-1">
          <img
            src={prod.imagen}
            alt={prod.nombre}
            className="w-12 h-12 object-cover"
          />
        </td>
        <td className="border px-2 py-1">{prod.nombre}</td>
        <td className="border px-2 py-1">
          ${prod.precio_venta}
        </td>
        <td className="border px-2 py-1 text-center">
          <button
            className="bg-gray-200 px-2 cursor-pointer rounded"
            onClick={() => {
              if (enVenta) {
                actualizarCantidad(
                  prod.id_producto,
                  Math.max(1, cantidad - 1)
                );
              } else {
                agregarProductoAVenta(prod);
              }
            }}
            disabled={enVenta && cantidad <= 1 || sinStock}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={prod.stock}
            value={enVenta ? cantidad : ""}
            placeholder={sinStock ? "0" : "1"}
            disabled={sinStock}
            onFocus={() => {
              if (!enVenta && !sinStock) agregarProductoAVenta(prod);
            }}
            onChange={(e) => {
              let val = parseInt(e.target.value) || 1;
              if (val > prod.stock) val = prod.stock;
              if (enVenta) {
                actualizarCantidad(prod.id_producto, val);
              } else if (!sinStock) {
                agregarProductoAVenta({
                  ...prod,
                  cantidad: val,
                });
              }
            }}
            className="w-16 border rounded p-1 text-center mx-2"
            style={{ width: "60px" }}
          />
          <button
            className="bg-gray-200 cursor-pointer px-2 rounded"
            onClick={() => {
              if (enVenta && cantidad < prod.stock) {
                actualizarCantidad(
                  prod.id_producto,
                  cantidad + 1
                );
              } else if (!enVenta && !sinStock) {
                agregarProductoAVenta(prod);
              }
            }}
            disabled={sinStock || (enVenta && cantidad >= prod.stock)}
          >
            +
          </button>
          {sinStock && (
            <div className="text-xs text-red-500 mt-1">Sin stock</div>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
              </table>
            </div>
            {/* Productos seleccionados */}
            {productosVenta.length > 0 && (
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Productos a vender
                </label>
                <ul>
                  {productosVenta.map((p) => (
                    <li key={p.id_producto}>
                      {p.nombre} - Cantidad: {p.cantidad} - Precio: $
                      {p.precio_venta}
                      <button
                        className="ml-2 bg-red-500 text-white cursor-pointer px-2 py-1 rounded"
                        onClick={() => eliminarProducto(p.id_producto)}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Totales y descuento */}
            <div className="mb-2">
              <label className="block font-semibold">
                Precio total: ${totalVenta.toFixed(2)}
              </label>
            </div>
            <div className="mb-2">
              <label className="block font-semibold">Descuento (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                className="w-24 border rounded p-1"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">
                Total neto: $
                {(
                  totalVenta -
                  (totalVenta * (parseFloat(descuento) || 0)) / 100
                ).toFixed(2)}
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2  cursor-pointer rounded-md"
                onClick={() => setMostrarModalVenta(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-500"
                onClick={handleRealizarVenta}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal para crear cliente */}
      {mostrarModalCliente && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crear Cliente</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nuevoCliente.nombre}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Correo</label>
              <input
                type="email"
                value={nuevoCliente.correo}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, correo: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Teléfono</label>
              <input
                type="text"
                value={nuevoCliente.telefono}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Dirección</label>
              <input
                type="text"
                value={nuevoCliente.direccion}
                onChange={(e) =>
                  setNuevoCliente({
                    ...nuevoCliente,
                    direccion: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Tipo de Cliente
              </label>
              <select
                value={nuevoCliente.tipo_cliente}
                onChange={(e) =>
                  setNuevoCliente({
                    ...nuevoCliente,
                    tipo_cliente: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="minorista">Minorista</option>
                <option value="mayorista">Mayorista</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 cursor-pointer rounded-md"
                onClick={() => setMostrarModalCliente(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-500"
                onClick={handleCrearCliente}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para detalle de venta */}
      {mostrarDetalleVenta && detalleVenta && (
        <div className="fixed inset-0  flex justify-center  items-center z-50 backdrop-blur-xs">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto border">
            <h2 className="text-xl font-bold mb-4">Detalle de Venta</h2>

            <div className="mb-2 flex justify-between items-center">
              <span>
                <strong>Fecha:</strong> {detalleVenta.fecha_venta?.slice(0, 10)}
              </span>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
                onClick={() =>
                  generarPDFVenta(
                    {
                      total_venta: detalleVenta.total_venta,
                      total_neto: detalleVenta.total_neto,
                      descuento: detalleVenta.descuento || 0,
                    },
                    detalleVenta.productos,
                    { nombre: detalleVenta.cliente_nombre },
                    idNegocioReal
                  )
                }
              >
                Generar Factura
              </button>
            </div>
            <div className="mb-2">
              <strong>Cliente:</strong> {detalleVenta.cliente_nombre}
            </div>
            <div className="mb-2">
              <strong>Empleado:</strong> {detalleVenta.empleado_nombre}
            </div>
            <div className="mb-2">
              <strong>Total:</strong> ${detalleVenta.total_venta}
            </div>
            <div className="mb-2">
              <strong>Descuento:</strong> {detalleVenta.descuento || 0}
            </div>
            <div className="mb-2">
              <strong>Total Neto:</strong> ${detalleVenta.total_neto}
            </div>
            <div className="mb-4">
              <strong>Productos:</strong>
              <ul className="list-disc ml-6">
                {detalleVenta.productos?.map((p) => (
                  <li key={p.id_producto}>
                    {p.nombre} - Cantidad: {p.cantidad} - Precio: $
                    {p.precio_unitario}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setMostrarDetalleVenta(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
