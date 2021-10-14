import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createBrowserHistory } from 'history';
import Register from './components/register/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Header from './components/Header';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: 320,
    width: '100%'
  }
})

export default function Root() {
    const history = createBrowserHistory();
    const classes = useStyles();


    const wrapHeaderAndSidebar = (component) => {
        return (
          <Box flex={1} display="flex" flexDirection="row">
            <Box>
                <Navbar />
            </Box>
            <Box flex={1} className={classes.appMain}>
              <Header />
              <Box>
                {component}
              </Box>
            </Box>
          </Box>
        );
      }

    const getComponent = (componentName) => {
        switch (componentName) {
          case "login":
            return <Login />
        case "register":
        return <Register />
          case "dashboard":
            return wrapHeaderAndSidebar(<Dashboard />)
          default: 
            return <div>Component not found</div>
        }
      }

    return (
        <BrowserRouter history={history}>
            <Switch>
            <Route exact path="/" component={() => getComponent("login") } />
            <Route exact path="/register" component={() => getComponent("register") } />
            <Route exact path="/dashboard" component={() => getComponent("dashboard") } />
            </Switch>
        </BrowserRouter>
    )
}
