import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ManageBusinessesPage from "../pages/ManageBusinessesPage";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<LandingPage />} />
                <Route path="/Manage/*" element={<ManageBusinessesPage />} />
                <Route path="/Login" element={<LoginPage />} />
                {/* <Route path="/nav" element={<Navbar />} /> */}
            </Routes>
        </Router>
    )  
};

export default AppRoutes;