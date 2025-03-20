import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import LandingPage from "../features/landing/LandingPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/nav" element={<Navbar />} /> */}
            </Routes>
        </Router>
    )  
};

export default AppRoutes;