import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Inicio from "../features/dashboard/Inicio";

const EmpresaPage = () => {
  return (
    <>
      <section className="w-screen h-screen flex">
        <Sidebar />
        <div className="flex-1 w-full h-full p-7">
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default EmpresaPage;
