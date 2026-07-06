
import { Routes, Route , Router} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Dashboard from '../Pages/dashboard.jsx'
import CreateCL from '../Pages/create.jsx';
import Get from '../Pages/get.jsx';
import Update from '../Pages/update.jsx';

import AppraisalQuestion from '../Pages/AppraisalQuestion/index.jsx';
import AddAppraisalQuestion from '../Pages/AppraisalQuestion/Form.jsx';
import AddDesignation from "../Pages/AppraisalQuestion/addDesignation.jsx";
import AddOption from '../Pages/AppraisalQuestion/addOption.jsx';
import UpdateOption from "../Pages/AppraisalQuestion/optionfiles/optionEdit.jsx";
import UpdateAppraisalQuestion from "../Pages/AppraisalQuestion/Edit.jsx"


export default function AppRoutes(){
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
                           <Route path="/AppraisalQuestion/index" element={<AppraisalQuestion/>} />
                            <Route path="/AppraisalQuestion/index/Form" element={<AddAppraisalQuestion/>} />
                           <Route path="/AppraisalQuestion/index/AddDesignation" element={<AddDesignation />} />
                           <Route path="/AppraisalQuestion/index/AddOption" element={<AddOption />} />
                           <Route path="/AppraisalQuestion/index/addOption/optionEdit" element={<UpdateOption />} />
                            <Route path="/AppraisalQuestion/index/Edit" element={<UpdateAppraisalQuestion />} />
                            </Routes>
    </Router>
    );
}