
import MiniDrawer from './components/sideBar.jsx'

import './App.css'
import { BrowserRouter } from "react-router-dom";

 

export default function App() {
// const root =ReactDom.createRoot(document.getElementById('root'));
  return (
    <>
      <BrowserRouter>
       
        <MiniDrawer/>
 
      </BrowserRouter>

    </>
  )
}
