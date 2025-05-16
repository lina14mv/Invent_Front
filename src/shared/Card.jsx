import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const Card = ({ image, title, subtitle, description, LinkedIn, Github }) => {
  return (
    <motion.div
      className="bg-gray-100 shadow-lg rounded-2xl lg:p-4 p-2 w-64 h-80 mx-auto transition-all hover:scale-107 hover:shadow-2xl hover:border"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={image}
        alt={title}
        className="w-30 h-30 mx-auto rounded-full border-3 border-green-500 object-cover lg:mt-3 mt-1"
      />
      <div className="text-center mt-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <h3 className="text-md text-gray-500">{subtitle}</h3>
        <p className="text-md text-gray-700 mt-1">{description}</p>
      </div>
      <div className="flex justify-center mt-2 gap-4 text-2xl">
        <button onClick={() => window.open({ LinkedIn }, "_blank")}>
          <FontAwesomeIcon
            icon={faLinkedin}
            className=" text-green-500 cursor-pointer"
          />
        </button>
        <button onClick={() => window.open({ Github }, "_blank")}>
          <FontAwesomeIcon icon={faGithub} className=" cursor-pointer" />
        </button>
      </div>
    </motion.div>
  );
};

const Producto = (props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 lg:gap-x-4 gap-x-2 bg-green-200 lg:p-5 p-2 border rounded-2xl lg:max-w-64 md:max-w-52 sm:max-w-44 max-w-40 lg:h-52 md:h-48 sm:h-44 h-40 border-green-300">
      <h2 className="col-span-2 lg:text-3xl md:text-xl sm:text-lg text-md font-bold text-center">
        {props.title}
      </h2>
      <img src={props.img} alt="imagen" className="row-span-2 w-full h-full" />
      <p className="lg:text-xl md:text-lg sm:text-md text-xs row-span-2">
        {props.description}
      </p>
    </div>
  );
};

const CardInfo = (props) => {
  return (
    <div className="h-40 w-52 bg-white rounded-2xl shadow-md flex items-center px-4 py-3 gap-4">
      <div className="flex items-center justify-center w-1/3">
        <FontAwesomeIcon icon={props.icon} className="text-5xl" />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">{props.num}</h1>
        <p className="text-sm text-gray-500">{props.description}</p>
      </div>
    </div>
  );
};

export { Producto, Card, CardInfo };
