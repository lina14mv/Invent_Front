import { useState } from "react";
import { Boton, A } from "../../../shared/Elements";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a className="font-bold text-4xl flex-5 justify-start pl-20 flex cursor-pointer" href="/">
        INVENT<span className="text-green-600 animate-bounce">+</span>+
      </a>
      <nav className="justify-between flex-4 2xl:pr-10 pr-4 hidden lg:flex gap-x-2">
        <A href="/Somos">Somos?</A>
        <A href="/Contactanos">Contactanos</A>
        <A href="/Productos">Productos</A>
        <Boton><Link to="/Login">Entrar</Link></Boton>
      </nav>
      <div className="flex lg:hidden">
        <Boton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FontAwesomeIcon icon={faClose} className="text-green-600"/> : <FontAwesomeIcon icon={faBars} className="text-green-600"/>}
          {isOpen ? <section className="fixed flex flex-col right-0 mr-20 p-4 gap-y-3 bg-white border rounded-3xl z-10">
            <A href="/Somos">Somos?</A>
            <A href="/Contactanos">Contactanos</A>
            <A href="/Productos">Productos</A>
            <Boton>
              <Link to="/Login">Entrar</Link>
            </Boton>
          </section> : " "}
        </Boton>
      </div>
    </>
  );
};

export default Navbar;
