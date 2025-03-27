import { motion } from "framer-motion";

const Animacion = () => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
    >
      <div className="bg-red-400 w-98 h-98 flex justify-center"></div>
    </motion.div>
  );
};

export default Animacion;
