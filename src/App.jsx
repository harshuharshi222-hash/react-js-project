import './App.css'
import MiniDrawer from './components/sideBar.jsx'
import PromotionalActivity from './components/promotionalt.jsx'
import './components/sideBar.css'
import Dashboard from './components/dashboard.jsx'
import CreateCL from './components/create.jsx'
import Get from './components/get.jsx'
import Update from './components/update.jsx'

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";



export default function App(){
return(
    <>
         {/* <MiniDrawer/> */}
        <Routes>
        <Route path="components/sideBar" element={<MiniDrawer />} />
        <Route path="components/dashboard" element={< Dashboard/>} />
        <Route path="components/promotionalt" element={<PromotionalActivity/>} />
        <Route path="components/create" element={<CreateCL/>} />
        <Route path="components/get" element={<Get/>} />
        <Route path="components/update" element={<Update/>} />

        
        

      </Routes>
    </>
    
)

}