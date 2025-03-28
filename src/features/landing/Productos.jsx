import { Producto, Card } from "../../shared/Card";
import { motion } from "framer-motion";

const Productos = () => {
  return (
    <section>
      <h1 className="text-6xl text-center font-semibold pt-10 px-40">
        Productos<span className="text-green-400"> !</span>
      </h1>
      <p className="text-center mt-8 px-40 text-3xl">
        Conoce nuestros productos y servicios.
      </p>
      <section className="flex justify-center p-20">
        <div className="2xl:flex hidden">
          <Card
            image="/src/assets/dev.jpg"
            title="Diego Moreno"
            subtitle="Frontend Developer"
            description="Apasionado por React y el diseño web."
            LinkedIn="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
            Github="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
          />
        </div>
        <div className="flex-1 flex flex-wrap justify-center items-start gap-4">
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
          {/* <div className="w-98 flex justify-center mt-20 border-green-300">
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#BBF7D0",
                borderRadius: 5,
                borderColor: "#86EFAC",
                borderWidth: 2,
              }}
            />
          </div> */}
        </div>
        <div className="2xl:flex hidden">
          <Card
            image="https://via.placeholder.com/150"
            title="Lina Maria"
            subtitle="FullStack Developer"
            description="Apasionada por React y el diseño web."
            LinkedIn="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
            Github="www.linkedin.com/in/diego-fernando-moreno-martinez-b2b168256"
          />
        </div>
      </section>
    </section>
  );
};

export default Productos;
