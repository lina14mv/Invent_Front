import {
    faBars,
    faChartLine,
    faBox,
    faWarehouse,
    faShoppingCart,
    faCoins,
    faTicket,
    faGears,
    faUsers,
  } from "@fortawesome/free-solid-svg-icons";
  import { Option } from "/src/shared/Elements.jsx";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { Boton } from "../shared/Elements";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  const EmpresaSidebar = ({ enviarAncho }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <>
        {isOpen ? (
          (enviarAncho("64"),
          <div className="w-64 bg-blue-100 flex flex-col fixed h-screen">
            <Boton onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} className="text-blue-600 absolute right-4 top-4" />
            </Boton>
            <Link
              className="font-bold text-4xl justify-center text-center py-10"
              to="/empresa"
              onClick={() => setSelectedOption("null")}
            >
              EMPRESA<span className="text-blue-600 animate-pulse">+</span>
            </Link>
            <div className="flex flex-col items-center justify-center mt-4">
              {[
                { label: "Inicio", href: "/empresa", icon: faChartLine },
                { label: "Productos", href: "/empresa/productos", icon: faBox },
                { label: "Inventario", href: "/empresa/inventario", icon: faWarehouse },
                { label: "Ventas", href: "/empresa/ventas", icon: faShoppingCart },
                { label: "Finanzas", href: "/empresa/finanzas", icon: faCoins },
                { label: "Tickets", href: "/empresa/tickets", icon: faTicket },
                { label: "Configuración", href: "/empresa/configuracion", icon: faGears },
                { label: "Empleados", href: "/empresa/empleados", icon: faUsers },
              ].map((option) => (
                <Option
                  key={option.label}
                  className={`${
                    selectedOption === option.label ? "bg-blue-300" : ""
                  }`}
                  onClick={() => setSelectedOption(option.label)}
                  href={option.href}
                  icon={option.icon}
                >
                  {option.label}
                </Option>
              ))}
            </div>
          </div>)
        ) : (
          (enviarAncho("14"),
          <div className="flex flex-col w-14 h-screen pt-10 fixed">
            <Boton onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} className="text-blue-600 absolute right-4 top-8" />
            </Boton>
          </div>)
        )}
      </>
    );
  };
  
  export default EmpresaSidebar;