import React, { useState } from "react";
import axios from "axios";

const VerificarCodigo = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const correo = localStorage.getItem("correo");
      const response = await axios.post(
        "http://3.144.253.195/api/validar-codigo",
        {
          correo: correo,
          codigoSesion: code,
        }
      );

      if (response.status === 200) {
        const {
          token,
          tipo,
          debe_cambiar_contrasena,
          id,
          rol,
          nombre,
          fondo,
          color_primario,
          color_secundario,
        } = response.data;
        // Guardar el token y el id en el localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("rol", rol);
        localStorage.setItem("tipo", tipo);
        localStorage.setItem("nombre", nombre);
        const limpiarColor = (color) => color?.replace(/'/g, "");
        document.documentElement.style.setProperty(
          "--primary-color",
          limpiarColor(color_primario)
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          limpiarColor(color_secundario)
        );
        document.documentElement.style.setProperty(
          "--background-color",
          limpiarColor(fondo)
        );
        console.log("Colores:", color_primario, color_secundario, fondo);

        // Redirigir según el tipo de usuario

        if (debe_cambiar_contrasena) {
          onSubmit("changePassword");
        } else if (tipo === "administrador") {
          window.location.href = "/Manage";
        } else if (tipo === "negocio") {
          window.location.href = "/empresa";
        } else {
          window.location.href = "/vendedor";
        }
      }
    } catch (err) {
      console.error(err);
      setError("Código incorrecto. Por favor, intenta nuevamente.");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen p-5">
      <div className="bg-white bg-opacity-80 text-black p-8 rounded-lg w-full max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Verificación de código
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Código de verificación
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
          >
            Verificar código
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerificarCodigo;
