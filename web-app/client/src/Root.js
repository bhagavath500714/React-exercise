import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Box } from '@mui/material';
import { createBrowserHistory } from 'history';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';



export default function Root() {
    const history = createBrowserHistory();


    const wrapHeaderAndSidebar = (component) => {
        return (
          <Box flex={1} display="flex" flexDirection="row">
            <Box>
                <p>sidebar</p>
            </Box>
            <Box flex={1}>
              <p>Header</p>
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
