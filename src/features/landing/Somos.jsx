import { motion } from "framer-motion";

const Somos = () => {
  return (
    <section>
      <h1 className="lg:text-2xl md:text-xl sm:text-lg text-md text-center md:pt-14 pt-8 font-semibold subpixel-antialiased tracking-normal">
        Empoderamos tu negocio con tecnología sencilla y eficiente<span className="text-green-700">.</span>
      </h1>
      <section className="flex justify-evenly md:mt-18 mt-12 flex-wrap gap-y-8">
        <motion.div
          className="flex flex-col bg-green-300 lg:text-md text-sm lg:w-72 md:w-64 sm:w-60 w-56 lg:h-72 md:h-64 sm:h-60 h-56 lg:p-6 md:p-4 p-2 gap-4 rounded-4xl hover:border transition-all"
          whileHover={{ scale: 1.2 }}
        >
          <h1 className="text-center lg:text-lg md:text-md text-sm font-semibold">Valores</h1>
          <p>
            En Invent++ nos enfocamos en la calidad y el servicio al cliente.
          </p>
          <ul className="list-disc list-inside">
            <li>Calidad</li>
            <li>Servicio</li>
            <li>Compromiso</li>
            <li>Responsabilidad</li>
            <li>Respeto</li>
          </ul>
        </motion.div>
        <motion.div
          className="flex flex-col bg-green-300 lg:text-md text-sm lg:w-72 md:w-64 sm:w-60 w-56 lg:h-72 md:h-64 sm:h-60 h-56 lg:p-6 md:p-4 p-2 gap-4 rounded-4xl hover:border transition-all"
          whileHover={{ scale: 1.2 }}
        >
          <h1 className="text-center lg:text-lg md:text-md text-sm font-semibold">Misión</h1>
          <p>
            Revolucionar la gestión de pequeños negocios con tecnología
            intuitiva y poderosa, permitiendo que cada emprendedor tenga el
            control total de sus ventas, inventario y clientes sin
            complicaciones.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col bg-green-300 lg:text-md text-sm lg:w-72 md:w-64 sm:w-60 w-56 lg:h-72 md:h-64 sm:h-60 h-56 lg:p-6 md:p-4 p-2 gap-4 rounded-4xl hover:border transition-all"
          whileHover={{ scale: 1.2 }}
        >
          <h1 className="text-center lg:text-lg md:text-md text-sm font-semibold">
            Por que elegirnos?
          </h1>
          <ul className="list-disc list-inside">
            <li>Fácil y rápido de usar</li>
            <li>Control total de ventas e inventario</li>
            <li>Automatización inteligente</li>
            <li>Accesible desde cualquier lugar</li>
            <li>Crece con nosotros</li>
          </ul>
        </motion.div>
      </section>
    </section>
  );
};

export default Somos;
