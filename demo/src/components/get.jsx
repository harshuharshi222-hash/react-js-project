import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { TextField } from '@mui/material';
import './create.css';
import Button from '@mui/material/Button';
import { Height } from '@mui/icons-material';

export default function Get (){
            
return(
    <>
    
    <div className='formComponentContainer'>
        <div className='menuopenIconandComponentTitleContainer'>
        < MenuOpenIcon className='menuOpenIconAlignment'> </MenuOpenIcon>
            <h1 className="title" style={{color:"black"}}>Get Construction Link Payment</h1>
        </div>

        <div className='formDataContainer'>
            <select name='project' className='selectE1' >
                <option>Get Construction Payment Link</option>
                <option>others</option>

            </select>
            <TextField className ='inputElu' label="userID"  size="small" />

            
            <TextField className ='inputEl' label="milestoneName"  sx= {{ mb: 2 }} />
            <select name='project' className='selectE1' >
                <option>Status</option>
                <option> Active</option>
                </select>
                <TextField className ='inputEl' label="Generate Search"  sx= {{ mb: 2 }} />
             <TextField className ='inputEl' label="Sort Order" sx= {{ mb: 2 }} />
            <TextField className ='inputEl' label="iDisplay Start" sx= {{ mb: 2 }} />
             
            <TextField className ='inputElt' label="iDisplay Length"   sx= {{ mb: 2}} />
            
           
           
        </div>

        <div className='buttonsAlignment'>
                
            <button className='buttonStyle' >Get</button>
            <button className='buttonStyle'>Reset</button>

        </div>
        </div>
       
        </>
)
}