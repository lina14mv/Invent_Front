import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const A = (props) => {
  return (
    <a
      href={props.href}
      className="border rounded-full px-4 py-2 text-black bg-green-400 text-sm font-bold hover:bg-green-500 focus:animate-spin delay-150 hover:outline-2 outline-green-600"
    >
      {props.children}
    </a>
  );
};

const Boton = (props) => {
  return (
    <button
      type={props.type}
      className={`font-bold delay-150 text-2xl hover:font-extrabold hover:cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const Input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={`w-64 h-7 border-b-2 border-green-600 focus:border-3 ${props.className}`}
    />
  );
};

const Option = (props) => {
  return (
    <Link
      to={props.href}
      onClick={props.onClick}
      className={`group block w-full py-3 border-b cursor-pointer transition-all duration-300 ${props.className}`}
    >
      <div className="inline-flex items-center justify-center w-86 group-hover:w-full transition-all duration-300">
        {/* Ícono que se mueve suavemente a la izquierda en hover */}
        <FontAwesomeIcon
          icon={props.icon}
          className="text-xl transition-all duration-300 group-hover:ml-2"
        />

        {/* Texto oculto por defecto, aparece en hover */}
        <span className="overflow-hidden w-20 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 font-semibold text-lg">
          {props.children}
        </span>
      </div>
    </Link>
  );
};

export { Boton, A, Input, Option };
