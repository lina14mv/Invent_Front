import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Boton, Input } from "../../shared/Elements";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Contactanos = () => {
  return (
    <section className="flex justify-evenly lg:flex-row flex-col items-center w-screen">
      <div className="flex justify-center flex-col text-center lg:mt-18 mt-8 max-w-lg lg:px-12 px-8">
        <h1 className="lg:text-3xl text-2xl font-semibold">
          Contactanos
          <FontAwesomeIcon
            icon={faArrowDown}
            className="ml-3 border-b-6 text-green-600 text-3xl"
          />
        </h1>
        <p className="lg:text-lg text-md mt-8 px-10">
          ¿Tienes alguna duda o sugerencia? Contactanos a través de los
          siguientes medios.
        </p>
        <form className="lg:pt-10 pt-6 flex flex-col lg:gap-y-8 gap-y-5 lg:text-md text-xs justify-center items-center">
          <div className="flex md:flex-row flex-col justify-between gap-5">
            <Input type="text" placeholder="Nombre" />
            <Input type="email" placeholder="Correo" />
          </div>
          <div className="flex md:flex-row flex-col justify-between gap-5">
            <Input type="text" placeholder="Asunto" />
            <Input type="tel" placeholder="Telefono" />
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
      </div>
      <div className="flex flex-col lg:text-xl text-md items-start lg:pt-25 pt-7 lg:p-20 p-10">
        <h1 className="">Envianos un correo electronico:</h1>
        <p className="lg:text-3xl text-2xl font-bold lg:mt-5 mt-2">inventp24@gmail.com</p>
        <h1 className="lg:mt-10 mt-6">Tambien puedes encontrarnos aqui:</h1>
        <div className="flex justify-start gap-x-10 lg:mt-5 mt-2 text-6xl">
          <button
            onClick={() => window.open("https://wa.me/573002222222", "_blank")}
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-green-500 cursor-pointer"
            />
          </button>
          <button
            onClick={() => window.open("https://www.facebook.com", "_blank")}
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-blue-600 cursor-pointer"
            />
          </button>
          <button
            onClick={() => window.open("https://www.instagram.com", "_blank")}
          >
            <FontAwesomeIcon icon={faInstagram} className="cursor-pointer" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contactanos;
