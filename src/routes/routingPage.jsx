
import { Routes, Route, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";



import Dashboard from '../Pages/dashboard.jsx'
import CreateCL from '../Pages/create.jsx';
import Get from '../Pages/get.jsx';
import Update from '../Pages/update.jsx';

export default function AppRoutes() {
   const navigate = useNavigate();
   const handlegotopromotionalt = () => {
      navigate('/dashboard/table')
   }
   return (
      <Router>
         <Routes>
            <Route path="/dashboard/table/create" element={< CreateCL />} />
            <Route path="/dashboard/table" element={<PromotionalActivity />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/table/update" element={<Update />} />
         </Routes>
      </Router>
   );
}