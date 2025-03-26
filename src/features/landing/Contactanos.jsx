import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Boton, Input } from "../../shared/Elements";
import { faWhatsapp, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Contactanos = () => {
  return (
    <section>
      <h1 className="text-5xl text-center mt-20 px-40">
        Contactanos
        <FontAwesomeIcon
          icon={faArrowDown}
          className="ml-3 border-b-6 text-green-600"
        />
      </h1>
      <p className="text-center mt-10 px-40 text-xl">
        Tienes alguna duda o sugerencia? Contactanos a través de los siguientes
        medios
      </p>
      <section className="flex justify-center mt-8">
        <form className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-3 grid-rows-5 lg:w-4xl w-xl gap-x-18 gap-y-10 p-15 pl-26">
          <Input type="text" placeholder="Nombre" />
          <Input type="email" placeholder="Correo" />
          <Input type="text" placeholder="Asunto" />
          <Input type="tel" placeholder="Telefono" />
          <div className="flex justify-center col-span-2">
            <Boton
              type="submit"
              className="bg-green-400 text-2xl px-6 py-1 rounded-full"
            >
              Enviar
            </Boton>
          </div>
        </form>
      </section>
      <div className="flex justify-center text-7xl gap-20 mt-10">
        <button onClick={() => window.open("https://wa.me/573002222222", "_blank")}>
          <FontAwesomeIcon icon={faWhatsapp} className="text-green-500"/>
        </button>
        <button onClick={() => window.open("https://www.facebook.com", "_blank")}>
          <FontAwesomeIcon icon={faFacebook} className="text-blue-600"/>
        </button>
        <button onClick={() => window.open("https://www.instagram.com", "_blank")}>
          <FontAwesomeIcon icon={faInstagram} />
        </button>
      </div>
    </section>
  );
};

export default Contactanos;
