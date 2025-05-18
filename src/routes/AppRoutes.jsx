import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManageBusinessesPage from "../pages/ManageBusinessesPage";
import LoginPage from "../pages/LoginPage";
import EmpresaDashboardPage from "../pages/EmpresaDashboardPage";
import CatalogoPage from "../pages/CatalogoPage";
import { RutaProtegida } from "../components/RutaProtegida";
import EmpleadoPage from "../pages/EmpleadoPage";

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Manage/*"
          element={
            <RutaProtegida tipo="administrador" rol="null">
              <ManageBusinessesPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/Empresa/*"
          element={
            <RutaProtegida tipo="negocio" rol="null">
              <EmpresaDashboardPage />
            </RutaProtegida>
          }
        />
        {/* <Route
          path="/Admin/*"
          element={
            <RutaProtegida tipo="usuario" rol="administrador">
              <EmpresaDashboardPage />
            </RutaProtegida>
          }
        /> */}
        <Route
          path="/Vendedor/*"
          element={
            <RutaProtegida tipo="usuario" rol="empleado">
              <EmpleadoPage />
            </RutaProtegida>
          }
        />
        <Route path="/Catalogo/:id_negocio" element={<CatalogoPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
