import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Controls from '../../controls/Controls';
import { useForm, Form } from '../../hooks/useForm';
import * as employeeService from '../../services/employeeServices';
import { Link } from "react-router-dom"
import Notification from '../../hooks/Notification';
import { useHistory } from "react-router-dom";

const initialFvalue = {
  id: 0,
  fullName: '',
  email: '',
  password: '',
  mobile: '',
  city: '',
  gender: 'male',
  department: '',
  hireDate: new Date(),
  isPermanent: false,
}

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' }
]

const useStyles = makeStyles(theme => ({
  signinTxt: {
    color: '#4050b5',
  }
}))

export default function RegistartionForm(props) {
  const { openPopup, addOrEdit, recordForEdit } = props;
  const history = useHistory();
  const [isregister, setIsRegister] = useState(null);
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(values.email) ? '' : 'Email is not valid.'
    if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.'
    if ('department' in fieldValues)
      temp.department = fieldValues.department.length !== 0 ? '' : 'This field is required.'
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(x => x === '')
  }
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFvalue, true, validate);
  const classes = useStyles();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })

  useEffect(()=>{
    checkHistory();
  },[])

  const checkHistory =  () => {
    let pathValue = history.location.pathname
    let pathState = pathValue.substr(1);
    console.log('pathval', pathState);
    setIsRegister(pathState);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      if (isregister === 'register') {
        employeeService.userRegisteration(values).then((res) => {
          //  console.log('res--', res);
          if (res.data.success === 1) {
            console.log('registered successfully');
            resetForm();
            setNotify({
              isOpen: true,
              message: 'Submitted Successfully',
              type: 'success'
            })
          }
        })
      } else {
        addOrEdit(values, resetForm);
      }
  }
  }

  useEffect(() => {
    if(recordForEdit != null)
    setValues({
        ...recordForEdit
      })
  }, [recordForEdit])

  return (
    <Form onSubmit={handleSubmit}>
      {!openPopup &&
        <>
          <Box textAlign="left">
            <Link to="/"><Typography variant="caption" gutterBottom component="div" mt={1} mb={3} ml={1} className={classes.signinTxt}>
              Back to login
            </Typography>
            </Link>
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom component="div" mt={4} mb={5} className={classes.signinTxt}>
              REGISTERATION
            </Typography>
          </Box>
        </>
      }
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input name="fullName" label="Full Name" value={values.fullName} onChange={handleInputChange} error={errors.fullName} />
          <Controls.Input name="email" variant="outlined" label="Email" value={values.email} onChange={handleInputChange} error={errors.email} />
          <Controls.Input name="password" type="password" variant="outlined" label="Password" value={values.password} onChange={handleInputChange} />
          <Controls.Input name="mobile" label="Mobile" value={values.mobile} onChange={handleInputChange} error={errors.mobile} />
          <Controls.Input name="city" label="City" value={values.city} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup label="Gender" name="gender" value={values.gender} onChange={handleInputChange} items={genderItems} />
          <Controls.Select name="department" label="Department" value={values.department} onChange={handleInputChange} options={employeeService.getDepartmentCollection()} error={errors.department} />
          <Controls.Picker name="hireDate" label="Hire Date" value={values.hireDate} onChange={handleInputChange} />
          <Controls.CheckBox name="isPermanent" label="Permanent Employee" value={values.isPermanent} onChange={handleInputChange} />
          <Box>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </Box>
        </Grid>
      </Grid>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Form>
  )
}
