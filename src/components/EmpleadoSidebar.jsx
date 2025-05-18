import {
  faBars,
  faBox,
  faShoppingCart,
  faTicket,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Boton, Option } from "../shared/Elements";
import { useEffect } from "react";
import axios from "axios";

export const EmpleadoSidebar = ({ enviarAncho }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [idNegocioReal, setIdNegocioReal] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [nombre, setNombre] = useState("");

  const id_usuario = localStorage.getItem("id");
  const tipo = localStorage.getItem("tipo");
  const id_negocio_local = localStorage.getItem("id");

  useEffect(() => {
    const obtenerIdNegocio = async () => {
      if (tipo === "usuario") {
        try {
          const res = await axios.get(
            `http://localhost:5002/api/usuario/${id_usuario}`
          );
          // Ajusta el campo según tu backend, por ejemplo: pertenece_negocio
          setIdNegocioReal(res.data.pertenece_negocio);
        } catch (err) {
          console.error("Error al obtener el negocio del usuario:", err);
        }
      } else {
        setIdNegocioReal(id_negocio_local);
      }
    };
    obtenerIdNegocio();
  }, [tipo, id_usuario, id_negocio_local]);

  useEffect(() => {
    const nombreNegocio = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/api/negocio/${idNegocioReal}`
        );
        setNombre(res.data.nombre);
      } catch (err) {
        console.error("Error al obtener el nombre del negocio:", err);
      }
    };
    if (idNegocioReal) {
      nombreNegocio();
    }
  }, [idNegocioReal]);

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
                {nombre}<span className="animate-pulse">+</span>+
              </Link>
              <div className="flex flex-col items-center justify-center mt-4">
                {[
                  {
                    label: "Productos",
                    href: "/Vendedor/productos",
                    icon: faBox,
                  },
                  {
                    label: "Ventas",
                    href: "/Vendedor/ventas",
                    icon: faShoppingCart,
                  },
                  {
                    label: "Inventario",
                    href: "/Vendedor/inventario",
                    icon: faWarehouse,
                  },
                  {
                    label: "Tickets",
                    href: "/Vendedor/tickets",
                    icon: faTicket,
                  },
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
