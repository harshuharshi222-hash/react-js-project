
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

    
         const navigate = useNavigate();
       const handlegotocreate = () => {
          navigate('/dashboard/table/create')
       }
    
           const navigate1 = useNavigate();
       const handlegotodashboard = () => {
          navigate1('/dashboard')
       }
    
        const navigate2 = useNavigate();
           
    
            const handlegotoupdate = (row) => {
      navigate2("/dashboard/table/update/:id", {
        state: row,
      });

    return(

 
    <Router>
        <Routes>
                            <Route path="/create" element={< CreateCL />} />
                            <Route path="/promotionalt" element={<PromotionalActivity />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update" element={<Update />} />
                            </Routes>
    </Router>
    );
}
}