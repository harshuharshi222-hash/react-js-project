import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { TextField } from '@mui/material';
// import './create.css'

import { Height } from '@mui/icons-material';

 import React from 'react';
 import { useFormik } from 'formik';
 import * as Yup from 'yup';



export default function CreateCL(){
   const formik = useFormik({
     initialValues: {
      userID: '',
         milestoneName: '',
       percentage: '',
     },
  

     validationSchema: Yup.object({
       userID: Yup.number()
         .integer(10, 'Must be a whole number')
         .required('Required*'),
       milestoneName: Yup.string()
         .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
         .required('Required*'),
       percentage: Yup.number()
       .test('Invalid len','must be lessthan 0 or qual to 3 digits',
        val => val && val.toString().length <= 3
       ),
     }),
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
     
   });
 
return(
    <>
    
    <form>
    <div className='formComponentContainer'>
        <div className='menuopenIconandComponentTitleContainer'>
        < MenuOpenIcon className='menuOpenIconAlignment'> </MenuOpenIcon>
            <h1 className="title" style={{color:"black"}}>Create Construction Link Payment</h1>
        </div>

        <div className='formDataContainer'>
            <select name='project' className='selectE1' >
                <option>Create Construction Payment Link</option>
                <option>others</option>

            </select>
            {/* <TextField className ='inputElu' label="userID"  size="small" 
            id='userID'
            name='userID'
            type='text'
            onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.userID}
         helperText={formik.touched.userID && formik.errors.userID ? (
            <div className='errorUser'>{formik.errors.userID}</div>
):null}
             />
         */}


           <div>
          <TextField
  fullWidth
  label="User ID"
  name="userID"
  size='small'
  sx={{mb: 2}}
  value={formik.values.userID}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.userID && Boolean(formik.errors.userID)}
  helperText={formik.touched.userID && formik.errors.userID}
  FormHelperTextProps={{
    sx: {
      color: 'red',
      fontSize: '13px',
      
    },
  }}
/>
        </div>

            <TextField className ='inputEl' label="milestoneName"  sx= {{ mb: 2 }} 
            id='milestoneName'
            name='milestoneName'
            type='milestoneName'
            onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.milestoneName}
         helperText={formik.touched.milestoneName && formik.errors.milestoneName ? (
            <div className='errormilestoneName'>{formik.errors.milestoneName}</div>
):null}
            />
             <TextField className ='inputEl' label="percentage" sx= {{ mb: 2 }} 
              id='percentage'
            name='percentage'
            type='percentage'
            onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.percentage}
         helperText={formik.touched.percentage && formik.errors.percentage ? (
            <div className='errorpercentage'>{formik.errors.percentage} </div>
):null}
             />
            
             
            <TextField className ='inputElt' label="Description"   sx= {{ mb: 2}} 
            
            multiline
            rows={4}/>
          
        </div>
      

        <div className='buttonsAlignment'>
                
            <button className='buttonStyle' type='reset'  >Reset</button>
            <button className='buttonStyle' type='submit'  >Save</button>

 

        </div>
        </div>
        </form>
       
        </>
)
}