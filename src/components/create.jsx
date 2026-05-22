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
       displayOrder: '',
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
       displayOrder: Yup.string()
         .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
         .required('Required*'),
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
            <h1 className="title" style={{color:"black" }}>Create Construction Link Payment</h1>
        </div>

        <div className='formDataContainer'>
            <select name='project' className='selectE1' >
                <option>Create Construction Payment Link</option>
                <option>others</option>

            </select>



          <TextField
  fullWidth
  label="User ID"
  name="userID"
sx={{mb: 2}}
  size='small'
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

    

             <TextField
  fullWidth
  label="Milestone Name"
  name="milestoneName"
  sx={{mb: 2}}
  value={formik.values.milestoneName}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={
    formik.touched.milestoneName &&
    Boolean(formik.errors.milestoneName)
  }
  helperText={
    formik.touched.milestoneName &&
    formik.errors.milestoneName
  }
  FormHelperTextProps={{
    sx: {
      color: 'red',
    },
  }}
/>

<TextField
  fullWidth
  label="Percentage"
  name="percentage"
  sx={{mb: 2}}
  value={formik.values.percentage}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={
    formik.touched.percentage &&
    Boolean(formik.errors.percentage)
  }
  helperText={
    formik.touched.percentage &&
    formik.errors.percentage
  }
  FormHelperTextProps={{
    sx: {
      color: 'red',
    },
  }}
/>

<TextField
  fullWidth
  label="Display Oder"
  name="displayOrder"
  sx={{mb: 2}}
  value={formik.values.displayOrder}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={
    formik.touched.displayOrder &&
    Boolean(formik.errors.displayOrder)
  }
  helperText={
    formik.touched.displayOrder &&
    formik.errors.displayOrder
  }
  FormHelperTextProps={{
    sx: {
      color: 'red',
    },
  }}
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