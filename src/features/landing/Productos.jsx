import { Producto, Card } from "../../shared/Card";
import { motion } from "framer-motion";

const Productos = () => {
  return (
    <section className="flex justify-center px-6">
      <div className="lg:flex hidden items-center pt-20">
        <Card
          image="https://res.cloudinary.com/deucbjygt/image/upload/v1745380675/Imagen_de_WhatsApp_2025-03-12_a_las_11.15.38_987c6d94_t24knt.jpg"
          title="Diego Moreno"
          subtitle="Frontend Developer"
          description="Apasionado por React y el diseño web."
          LinkedIn="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
          Github="https://github.com/Dieguit0000"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg text-center font-semibold pt-7">
          Productos<span className="text-green-400"> !</span>
        </h1>
        <p className="text-center lg:text-lg md:text-md text-sm pt-2">
          Conoce nuestros productos y servicios.
        </p>
        <div className="flex lg:gap-2 gap-5 pt-5">
          <Producto
            title="Invent++"
            description="Sistema de inventario para tu empresa."
            img="src\assets\react.svg"
          />
          <Producto
            title="Invent++"
            description="Sistema de inventario para tu empresa."
            img="src\assets\react.svg"
          />
        </div>
      </div>
      <div className="lg:flex hidden items-center pt-20">
        <Card
          image="https://res.cloudinary.com/deucbjygt/image/upload/v1745380673/Imagen_de_WhatsApp_2025-02-25_a_las_08.23.30_f0d0ee8b_wvwvgy.jpg"
          title="Lina Maria"
          subtitle="FullStack Developer"
          description="Apasionada por el desarrollo y el aprendizaje constante."
          LinkedIn="https://www.linkedin.com/in/lina-maria-m-0183a5127/"
          Github="https://github.com/lina14mv6"
        />
      </div>
    </section>
  );
};

export default Productos;
