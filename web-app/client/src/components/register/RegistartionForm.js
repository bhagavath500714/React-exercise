import React, { useState } from 'react'
import { Grid, Box } from '@mui/material';
import Controls from '../../controls/Controls';
import {useForm, Form } from '../../hooks/useForm';
import * as employeeService from '../../services/employeeServices'

const initialFvalue = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
}

const genderItems = [
  {id:'male',title: 'Male'},
  {id:'female',title: 'Female'},
  {id:'other',title: 'Other'}
]

export default function RegistartionForm() {
  const validate = (fieldValues = values) => {
    let temp = {...errors}
    if('fullName' in fieldValues)
    temp.fullName = fieldValues.fullName ? '' : 'This field is required.'
    if('email' in fieldValues)
    temp.email = (/$^|.+@.+..+/).test(values.email) ? '' : 'Email is not valid.'
    if('mobile' in fieldValues)
    temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.'
    if('departmentId' in fieldValues)
    temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : 'This field is required.'
    setErrors({
      ...temp
    })
    if (fieldValues === values)
    return Object.values(temp).every(x => x === '')
  }
  const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialFvalue, true, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if(validate())
     employeeService.insertEmployee(values)
    //  resetForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input name="fullName" label="Full Name" value={values.fullName} onChange={handleInputChange} error={errors.fullName} />
          <Controls.Input name="email" variant="outlined" label="Email" value={values.email} onChange={handleInputChange} error={errors.email}/>
          <Controls.Input name="mobile" label="Mobile" value={values.mobile} onChange={handleInputChange} error={errors.mobile}/>
          <Controls.Input name="city" label="City" value={values.city} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup label="Gender" name="gender" value={values.gender} onChange={handleInputChange} items={genderItems} />
          <Controls.Select name="departmentId" label="Department" value={values.departmentId} onChange={handleInputChange} options={employeeService.getDepartmentCollection()} error={errors.departmentId} />
          <Controls.Picker name="hireDate" label="Hire Date" value={values.hireDate} onChange={handleInputChange} />
          <Controls.CheckBox name="isPermanent" label="Permanent Employee" value={values.isPermanent} onChange={handleInputChange} />
          <Box>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </Box>
        </Grid>
      </Grid>
    </Form>
  )
}
