import {
  faBars,
  faBuildingUser,
  faCoins,
  faGears,
  faTicket,
  faUsersGear,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "/src/shared/Elements.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Boton } from "../shared/Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ enviarAncho }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen ? 
        (
        enviarAncho("64"),
        <div className="w-64 bg-green-100 flex flex-col fixed h-screen">
          <Boton onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} className="text-green-600 absolute right-4 top-4" />
          </Boton>
          <Link
            className="font-bold text-4xl justify-center text-center py-10"
            to="/Manage"
            onClick={() => setSelectedOption("null")}
          >
            INVENT<span className="text-green-600 animate-pulse">+</span>+
          </Link>
          <div className="flex flex-col items-center justify-center mt-4">
            {[
              {
                label: "Empresas",
                href: "/Manage/empresas",
                icon: faBuildingUser,
              },
              {
                label: "Usuarios",
                href: "/Manage/usuarios",
                icon: faUsersGear,
              },
              {
                label: "General",
                href: "/Manage/operaciones",
                icon: faWarehouse,
              },
              { label: "Finanzas", href: "/Manage/finanzas", icon: faCoins },
              { label: "Soporte", href: "/Manage/soporte", icon: faTicket },
              {
                label: "Ajustes",
                href: "/Manage/configuracion",
                icon: faGears,
              },
            ].map((option) => (
              <Option
                key={option.label}
                className={`${option.label === "Empresas" ? "border-t" : ""} ${
                  selectedOption === option.label ? "bg-green-300" : ""
                }`}
                onClick={() => setSelectedOption(option.label)}
                href={option.href}
                icon={option.icon}
              >
                {option.label}
              </Option>
            ))}
          </div>
        </div>
      ) : (
        enviarAncho("14"),
        <div className="flex flex-col w-14 bg-green-100 h-screen pt-10 fixed">
          <Boton onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} className="text-green-600 absolute right-4 top-8" />
          </Boton>
        </div>
      )}
    </>
  );
};

export default Sidebar;
