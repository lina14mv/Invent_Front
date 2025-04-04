import { Option } from "/src/shared/Elements.jsx";
import { useState } from "react";

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-64 bg-green-100 flex flex-col">
      <a className="font-bold text-4xl justify-center text-center py-10" href="/Manage">
        INVENT<span className="text-green-600 animate-pulse">+</span>+
      </a>
      <div className="flex flex-col items-center justify-center mt-4">
        {[
          { label: "Empresas", href: "/Manage/empresas" },
          { label: "Usuarios", href: "/Manage/usuarios" },
          { label: "Operaciones", href: "/Manage/operaciones" },
          { label: "Finanzas", href: "/Manage/finanzas" },
          { label: "Soporte", href: "/Manage/soporte" },
          { label: "Configuración", href: "/Manage/configuracion" },
        ].map((option) => (
          <Option
            key={option.label}
            className={`${option.label === "Empresas" ? "border-t" : ""} ${
              selectedOption === option.label ? "bg-green-300" : ""
            }`}
            onClick={() => handleOptionClick(option.label)}
            href={option.href}
          >
            {option.label}
          </Option>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
