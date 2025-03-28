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
    <section className="flex xl:justify-evenly xl:flex-row flex-col xl:items-auto items-center w-screen">
      <div className="flex justify-center flex-col text-center xl:mt-28 mt-15 max-w-3xl px-12 ">
        <h1 className="xl:text-7xl text-5xl">
          Contactanos
          <FontAwesomeIcon
            icon={faArrowDown}
            className="ml-3 border-b-6 text-green-600"
          />
        </h1>
        <p className="xl:text-2xl text-xl mt-8">
          Tienes alguna duda o sugerencia? Contactanos a través de los
          siguientes medios.
        </p>
        <form className="pt-14 flex flex-col gap-y-8 text-lg">
          <div className="flex justify-between gap-x-5">
            <Input type="text" placeholder="Nombre" />
            <Input type="email" placeholder="Correo" />
          </div>
          <div className="flex justify-between gap-x-5">
            <Input type="text" placeholder="Asunto" />
            <Input type="tel" placeholder="Telefono" />
          </div>
          <div className="my-6">
            <Boton
              type="submit"
              className="bg-green-400 text-2xl px-8 py-1 rounded-full"
            >
              Enviar
            </Boton>
          </div>
        </form>
      </div>
      <div className="flex flex-col lg:text-3xl text-xl items-start xl:pt-40 pt-20 p-20">
        <h1 className="">Envianos un correo electronico:</h1>
        <p className="lg:text-5xl text-3xl font-bold mt-5 ">inventp24@gmail.com</p>
        <h1 className="mt-10">Tambien puedes encontrarnos aqui:</h1>
        <div className="flex justify-start gap-x-10 mt-5 text-6xl">
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
