import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { TextField } from '@mui/material';
import './create.css';
import Button from '@mui/material/Button';
import { Height } from '@mui/icons-material';
import { useFormik } from 'formik';
 import * as Yup from 'yup';
  import React from 'react';
  import IconButton from '@mui/material/IconButton';


   import { useNavigate } from "react-router-dom"

export default function Update(){

    const navigate = useNavigate();
      const handlegotopromotionalt = () => {
         navigate('/promotionalt')
      }

    const formik = useFormik({
         initialValues: {
          userID: '',
          clpID: '',
            milestoneName: '',
           percentage: '',
           displayOrder: '',
           discription: '',
           status: '',
         },


         validationSchema: Yup.object({
                userID: Yup.number()
                  .integer(10, 'Must be a whole number')
                  .required('Required*'),
                clpID: Yup.number()
                  .integer(8, 'Must be a whole number')
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
        <IconButton>
             <MenuOpenIcon
               sx={{
                 color: "#555",
                 fontSize: 30,
                 mr: 1,
               }}
               onClick={handlegotopromotionalt}
             />
           </IconButton>
            <h1 className="title" style={{color:"black"}}>Update Construction Link Payment</h1>
        </div>

        <div className='formDataContainer'>
            <select name='project' className='selectE1' >
                <option>Update Construction Payment Link</option>
                <option> Construction Payment Link</option>
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
              label="CLP ID"
              name="clpID"
            sx={{mb: 2}}
              size='small'
              value={formik.values.clpID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.clpID && Boolean(formik.errors.clpID)}
              helperText={formik.touched.clpID && formik.errors.clpID}
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
           <select name='project' className='selectE1' >
                <option>Status</option>
                <option> Active</option>
                </select>
        </div>

        <div className='buttonsAlignment'>
                
            <button className='buttonStyle'  type='update'>Update</button>
            <button className='buttonStyle' type='reset' >Reset</button>

        </div>
        </div>
        </form>
       
        </>
)
}