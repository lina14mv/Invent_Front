import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const Card = ({ image, title, subtitle, description, LinkedIn, Github }) => {
  return (
    <motion.div
      className="bg-gray-100 shadow-lg rounded-2xl p-6 sm:w-96 sm:h-96 mx-auto transition-all hover:scale-107 hover:shadow-2xl hover:border"
      whileHover={{ scale: 1.06 }}
    >
      <img
        src={image}
        alt={title}
        className="w-40 h-40 mx-auto rounded-full border-4 border-green-500 object-cover mt-5"
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <h3 className="text-gray-500">{subtitle}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <button onClick={() => window.open({ LinkedIn }, "_blank")}>
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-3xl text-green-500 cursor-pointer"
          />
        </button>
        <button onClick={() => window.open({ Github }, "_blank")}>
          <FontAwesomeIcon
            icon={faGithub}
            className="text-3xl cursor-pointer"
          />
        </button>
      </div>
    </motion.div>
  );
};

const Producto = (props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-x-4 bg-green-200 p-5 border rounded-2xl max-w-sm border-green-300">
      <h2 className="col-span-2 text-3xl font-bold text-center">{props.title}</h2>
      <img
        src={props.img}
        alt="imagen"
        className="row-span-2 w-full h-full"
      />
      <p className="text-xl row-span-2">
        {props.description}
      </p>
    </div>
  );
};

export { Producto, Card };
