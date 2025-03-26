import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Inicio from "../features/landing/Inicio";
import Somos from "../features/landing/Somos";
import Contactanos from "../features/landing/Contactanos";
import Productos from "../features/landing/Productos";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage Content={Inicio} />} />
                <Route path="/Somos?" element={<LandingPage Content={Somos} />} />
                <Route path="/Contactanos" element={<LandingPage Content={Contactanos} />} />
                <Route path="/Productos" element={<LandingPage Content={Productos} />} />
                {/* <Route path="/nav" element={<Navbar />} /> */}
            </Routes>
        </Router>
    )  
};

export default AppRoutes;