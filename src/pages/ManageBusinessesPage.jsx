import { Route, Routes } from "react-router-dom";
import Sidebar from "../features/Admin/Components/sidebar";
import Inicio from "../features/Admin/Inicio";
import Empresas from "../features/Admin/Empresas";
import Usuarios from "../features/Admin/Usuarios";
import Operaciones from "../features/Admin/Operaciones";
import Finanzas from "../features/Admin/Finanzas";
import Soporte from "../features/Admin/Soporte";
import Configuracion from "../features/Admin/Configuracion";


const ManegePage = () => {
  return (
    <section className="w-screen h-screen flex">
      <Sidebar />
      <div className="flex-1 w-full h-full p-7">
        <Routes>
          <Route path="/" element={<Inicio />}/>
          <Route path="/empresas" element={<Empresas/>}/>
          <Route path="/usuarios" element={<Usuarios />}/>
          <Route path="/operaciones" element={<Operaciones />}/>
          <Route path="/finanzas" element={<Finanzas />}/>
          <Route path="/soporte" element={<Soporte />}/>
          <Route path="/configuracion" element={<Configuracion />}/>
        </Routes>
      </div>
    </section>
  );
};

export default ManegePage;
