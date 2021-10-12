import React from 'react';
import {Box, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import RegistartionForm from './RegistartionForm'

const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
      width: '80%'
    }
  }))

const Register = () => {
    const classes = useStyles();
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Paper elevation={1} className={classes.root}>
                <RegistartionForm />
            </Paper>
        </Box>
    )
}

export default Register;
