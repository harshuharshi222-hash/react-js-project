
import { Routes, Route , Router} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";


import PromotionalActivity from './promotionalt.jsx'
import Dashboard from '../Pages/dashboard.jsx'
import CreateCL from '../Pages/create.jsx';
import Get from '../Pages/get.jsx';
import Update from '../Pages/update.jsx';

export default function AppRoutes(){
    <Router>
        <Routes>
                            <Route path="/create" element={< CreateCL />} />
                            <Route path="/promotionalt" element={<PromotionalActivity />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update" element={<Update />} />
                            </Routes>
    </Router>
}