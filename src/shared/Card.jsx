import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const Card = ({ image, title, subtitle, description, LinkedIn, Github }) => {
  return (
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-96 mx-auto transition-all hover:scale-105 hover:shadow-2xl"
          whileHover={{ scale: 1.06 }}
        >
          <img
            src={image}
            alt={title}
            className="w-40 h-40 mx-auto rounded-full border-4 border-green-500 object-cover"
          />
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <h3 className="text-gray-500">{subtitle}</h3>
            <p className="text-gray-700 mt-2">{description}</p>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button onClick={() => window.open({LinkedIn}, "_blank")}>
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl text-green-500 cursor-pointer"/>
            </button>
            <button onClick={() => window.open({Github}, "_blank")}>
                <FontAwesomeIcon icon={faGithub} className="text-3xl cursor-pointer"/>
            </button>
          </div>
        </motion.div>
  );
};

export default Card;
