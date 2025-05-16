import { faBars, faBuildingUser, faCoins, faGears, faTicket, faUsersGear, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Boton, Option } from "../shared/Elements";

export const EmpleadoSidebar = ({ enviarAncho }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen
        ? (enviarAncho("64"),
          (
            <div className="w-64 secondary flex flex-col fixed h-screen">
              <Boton onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                  icon={faBars}
                  className="absolute right-4 top-4"
                />
              </Boton>
              <Link
                className="font-bold text-4xl justify-center text-center py-10"
                to="/Vendedor"
                onClick={() => setSelectedOption("null")}
              >
                INVENT<span className="animate-pulse">+</span>+
              </Link>
              <div className="flex flex-col items-center justify-center mt-4">
                {[
                  {
                    label: "Productos",
                    href: "/Vendedor/productos",
                    icon: faBuildingUser,
                  },
                  {
                    label: "Ventas",
                    href: "/Vendedor/ventas",
                    icon: faBuildingUser,
                  },
                  {
                    label: "Inventario",
                    href: "/Vendedor/inventario",
                    icon: faWarehouse,
                  },
                  {
                    label: "Catalogo",
                    href: "/Vendedor/catalogo",
                    icon: faUsersGear,
                  }
                ].map((option) => (
                  <Option
                    key={option.label}
                    className={`${
                      option.label === "Empresas" ? "border-t" : ""
                    } ${selectedOption === option.label ? "bg-green-300" : ""}`}
                    onClick={() => setSelectedOption(option.label)}
                    href={option.href}
                    icon={option.icon}
                  >
                    {option.label}
                  </Option>
                ))}
              </div>
            </div>
          ))
        : (enviarAncho("14"),
          (
            <div className="background flex flex-col w-14 h-screen pt-10 fixed">
              <Boton onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                  icon={faBars}
                  className="absolute right-4 top-8"
                />
              </Boton>
            </div>
          ))}
    </>
  );
};
