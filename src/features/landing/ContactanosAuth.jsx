import { Boton, Input } from "../../shared/Elements";
import { useState } from "react";
import Notiflix from "notiflix";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/paraContactar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      Notiflix.Notify.success("Formulario enviado con éxito!");
    } catch (error) {
      console.error("Error:", error);
      Notiflix.Notify.failure("Error al enviar el formulario.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:pt-10 pt-6 flex flex-col lg:gap-y-8 gap-y-5 lg:text-md text-xs justify-center items-center"
    >
      <div className="flex md:flex-row flex-col justify-between gap-5">
        <Input
          type="name"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="correo"
          placeholder="Correo electronico"
          value={formData.correo}
          onChange={handleChange}
        />
      </div>
      <div className="flex md:flex-row flex-col justify-between gap-5">
        <Input
          type="mensaje"
          name="mensaje"
          placeholder="Asunto"
          value={formData.mensaje}
          onChange={handleChange}
        />
        <Input
          type="telefono"
          name="telefono"
          placeholder="Telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="my-6">
        <Boton
          type="submit"
          className="bg-green-400 text-lg px-5 py-1 rounded-full hover:outline outline-green-400"
        >
          Enviar
        </Boton>
      </div>
    </form>
  );
};

export default Formulario;
