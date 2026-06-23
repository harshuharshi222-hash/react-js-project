import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { TextField } from '@mui/material';
import './create.scss';
import Button from '@mui/material/Button';
import { Height, Maximize } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

export default function Get() {
  const formik = useFormik({
    initialValues: {
      userID: '',
      milestoneName: '',
      initialValues: {
        project: "",
      },

      validationSchema: Yup.object({
        project: Yup.string().required("Required*"),
      }),

      onSubmit: (values) => {
        console.log(values);
      },
      generalSearch: '',
      sortOrder: '',
      idisplayStart: '',
      idisplayLength: '',

    },


    validationSchema: Yup.object({
      userID: Yup.number()
        .integer(10, 'Must be a whole number')
        .required('Required*'),
      milestoneName: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
        .required('Required*'),
      generalSearch: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
        .required('Required*'),
      sortOrder: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
        .required('Required*'),
      idisplayStart: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
        .required('Required*'),
      idisplayLength: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'only letters and numbers are allowed')
        .required('Required*'),
    }),




    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

  });



  return (
    <>
      <form>

        <div className='formComponentContainer'>
          <div className='menuopenIconandComponentTitleContainer'>
            < MenuOpenIcon className='menuOpenIconAlignment'> </MenuOpenIcon>
            <h1 className="title" style={{ color: "black" }}>Get Construction Link Payment</h1>
          </div>

          <div className='formDataContainer'>
            <select name='project' className='selectE1' >
              <option>Get Construction Payment Link</option>
              <option>others</option>

            </select>

            <TextField
              fullWidth
              label="User ID"
              name="userID"
              sx={{ mb: 2 }}
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
              sx={{ mb: 2 }}
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
            {/* //use autoComplete  */}
            {/* <select
              name="project"
              className="selectE1"
              value={formik.values.project}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
            </select> */}
            <Autocomplete
  options={[
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ]}
  value={
    [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ].find((option) => option.value === formik.values.status) || null
  }
  onChange={(event, newValue) => {
    formik.setFieldValue("status", newValue?.value || "");
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Status"
      error={formik.touched.status && Boolean(formik.errors.status)}
      helperText={formik.touched.status && formik.errors.status}
    />
  )}
/>


            <TextField
              fullWidth
              label="General Search"
              name="generalSearch"
              sx={{ mb: 2 }}
              value={formik.values.generalSearch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.generalSearch &&
                Boolean(formik.errors.generalSearch)
              }
              helperText={
                formik.touched.generalSearch &&
                formik.errors.generalSearch
              }
              FormHelperTextProps={{
                sx: {
                  color: 'red',
                },
              }}
            />
            <TextField
              fullWidth
              label="Sort Order"
              name="sortOrder"
              sx={{ mb: 2 }}
              value={formik.values.sortOrder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.sortOrder &&
                Boolean(formik.errors.sortOrder)
              }
              helperText={
                formik.touched.sortOrder &&
                formik.errors.sortOrder
              }
              FormHelperTextProps={{
                sx: {
                  color: 'red',
                },
              }}
            />
            <TextField
              fullWidth
              label="iDisplay Start"
              name="idisplayStart"
              sx={{ mb: 2 }}
              value={formik.values.idisplayStart}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.idisplayStart &&
                Boolean(formik.errors.idisplayStart)
              }
              helperText={
                formik.touched.idisplayStart &&
                formik.errors.idisplayStart
              }
              FormHelperTextProps={{
                sx: {
                  color: 'red',
                },
              }}
            />

            <TextField
              fullWidth
              label="iDisplay Length"
              name="idisplayLength"
              sx={{ mb: 2 }}
              value={formik.values.idisplayLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.idisplayLength &&
                Boolean(formik.errors.idisplayLength)
              }
              helperText={
                formik.touched.idisplayLength &&
                formik.errors.idisplayLength
              }
              FormHelperTextProps={{
                sx: {
                  color: 'red',
                },
              }}
            />





          </div>

          <div className='buttonsAlignment'>

            <button className='buttonStyle1' type='get'>Get    </button>
            <button className='buttonStyle' type='reset'>Reset</button>

          </div>
        </div>
      </form>

    </>
  )
}