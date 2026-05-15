import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { TextField } from '@mui/material';
import './create.css';
import Button from '@mui/material/Button';
import { Height } from '@mui/icons-material';

export default function Update(){
            
return(
    <>
    
    <div className='formComponentContainer'>
        <div className='menuopenIconandComponentTitleContainer'>
        < MenuOpenIcon className='menuOpenIconAlignment'> </MenuOpenIcon>
            <h1 className="title" style={{color:"black"}}>Update Construction Link Payment</h1>
        </div>

        <div className='formDataContainer'>
            <select name='project' className='selectE1' >
                <option>Update Construction Payment Link</option>
                <option> Construction Payment Link</option>
                <option>others</option>  

            </select>
            <TextField className ='inputElu' label="userID"  size="small" />

            <TextField className ='inputEl' label="clpID"  sx= {{ mb: 2 }} />
            <TextField className ='inputEl' label="milestoneName"  sx= {{ mb: 2 }} />
             <TextField className ='inputEl' label="percentage" sx= {{ mb: 2 }} />
            <TextField className ='inputEl' label="Display Order" sx= {{ mb: 2 }} />
             
            <TextField className ='inputElt' label="Description"   sx= {{ mb: 2}} 
            

            
            multiline
            rows={4}/>
           <select name='project' className='selectE1' >
                <option>Status</option>
                <option> Active</option>
                </select>
        </div>

        <div className='buttonsAlignment'>
                
            <button className='buttonStyle' >Update</button>
            <button className='buttonStyle'>Reset</button>

        </div>
        </div>
       
        </>
)
}