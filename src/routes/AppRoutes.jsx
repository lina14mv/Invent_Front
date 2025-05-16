import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManageBusinessesPage from "../pages/ManageBusinessesPage";
import LoginPage from "../pages/LoginPage";
import EmpresaDashboardPage from "../pages/EmpresaDashboardPage";
import CatalogoPage from "../pages/CatalogoPage";
import { RutaProtegida } from "../components/RutaProtegida";

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Manage/*"
          element={
            <RutaProtegida tipo="superadmin">
              <ManageBusinessesPage />
            </RutaProtegida>
          }
        />
        <Route path="/Empresa/*" element={<EmpresaDashboardPage />} /> 
        {/* <Route
          path="/Empresa/*"
          element={
            <RutaProtegida tipo="empresa">
              <EmpresaDashboardPage />
            </RutaProtegida>
          }
        /> */}
        <Route path="/Catalogo/*" element={<CatalogoPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
