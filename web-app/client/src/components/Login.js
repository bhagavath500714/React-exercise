import React, { useState } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Controls from '../controls/Controls';
import { useForm, Form } from '../hooks/useForm';
import * as employeeService from '../services/employeeServices';
import { createBrowserHistory } from 'history';
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector, connect } from 'react-redux'
import Notification from '../hooks/Notification';

const useStyles = makeStyles(theme => ({
  loginWrap: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  loginBox: {
    width: '90%',
  },
  submitBtn: {
    borderRadius: '20px !important',
    minWidth: '120px !important',
    marginTop: '40px !important'
  },
  loginInput: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 140px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  signinTxt: {
    color: '#4050b5',
  },
  captionTxt: {
    color: '#ccc',
  },
  linkTxt: {
    fontWeight: 600,
    color: '#4050b5',
    cursor: 'pointer'
  },
  infoTxt: {
    color: '#fff'
  }
}))

const initialFvalue = {
  email: '',
  password: ''
}


const Login = () => {
  const [notify, setNotify] = useState({isOpen:false, message:'', type:'info'});
  const classes = useStyles();
  const history = useHistory();
  let browserHitory = createBrowserHistory();
  const dispatch = useDispatch();
  
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(values.email) ? '' : 'Email is not valid.'
    if ('password' in fieldValues)
    temp.password = fieldValues.password ? '' : 'This field is required.'
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(x => x === '')
  }
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialFvalue, true, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate())
    employeeService.userLogin(values).then((res) => {
       console.log('res--', res);
       if(res.data.success === 1) {
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("email", values.email);
        dispatch({ type: 'SET_USER', value: res})
        history.replace("/dashboard");
        browserHitory.replace("/dashboard");
      }
      if(res.data.success === 0) {
        setNotify({
          isOpen: true,
          message: 'Invalid user',
          type: 'error'
        })
      }
    })
  }
  
  return (
    <Box className={classes.loginWrap}>
      <Paper elevation={1} className={classes.loginBox}>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <Box className={classes.loginInput}>
            <Typography variant="h5" gutterBottom component="div" mb={2} className={classes.signinTxt}>
        SIGN IN
      </Typography>
              <Controls.Input variant="standard" name="email" label="Email" value={values.email} onChange={handleInputChange} error={errors.email} />
              <Controls.Input variant="standard" name="password" type="password" label="Password" value={values.password} onChange={handleInputChange} error={errors.password} />
              <Controls.Button text="Submit" type="submit" className={classes.submitBtn} />
              <Typography variant="caption" gutterBottom component="div" mb={2} mt={2} className={classes.captionTxt}>Don't have an account? <Link className={classes.linkTxt} to="/register"> Sign Up Now</Link></Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
          <Box className="loginBg">
          <Typography variant="h5" gutterBottom component="div" mb={2} className={classes.infoTxt}>EMPLOYEE SYSTEM</Typography>
            </Box>
          </Grid>
        </Grid>
        <Notification 
        notify={notify}
        setNotify={setNotify}
      />
        </Form>
      </Paper>
    </Box>
  )
}

const mapStateToProps = (state) => {
  // console.log(state.User);
  return state;
}

export default connect(mapStateToProps)(Login);

