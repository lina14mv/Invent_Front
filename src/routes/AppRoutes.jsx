import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManageBusinessesPage from "../pages/ManageBusinessesPage";
import LoginPage from "../pages/LoginPage";
import EmpresaPage from "../pages/EmpresaPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<LandingPage />} />
                <Route path="/Manage/*" element={<ManageBusinessesPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Empresa/*" element={<EmpresaPage />}/>
            </Routes>
        </Router>
    )  
};

export default AppRoutes;