import React, {useState} from 'react';
import {Box, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import RegistartionForm from './RegistartionForm'

const useStyles = makeStyles(theme => ({
    registerWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f3fb'
    },
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
      width: '80%',
      minHeight: '70%'
    }
  }))

const Register = () => {
    const classes = useStyles();
    
    return (
        <Box className={classes.registerWrap}>
            <Paper elevation={1} className={classes.root}>
                <RegistartionForm />
            </Paper>
        </Box>
    )
}

export default Register;
