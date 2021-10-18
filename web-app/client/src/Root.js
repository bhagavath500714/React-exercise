import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createBrowserHistory } from 'history';
import Register from './components/register/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: 320,
    width: '100%'
  },
  container: {
    padding: 40,
    background: '#f4f5fd',
    height: 'calc(100vh - 63px)',
    overflowY: 'auto'
  }
})

const Root = (props) => {
    const history = createBrowserHistory();
    const classes = useStyles();
    const email = window.sessionStorage.getItem("email");

    const isCheck = () => {
      const token = window.sessionStorage.getItem("token");
      // console.log('is token--', token);
      // console.log('is prop--', props.CheckToken);
      // console.log('is check--', token === props.CheckToken);

      if(token === props.CheckToken){
        return true;
      } else {
        window.sessionStorage.clear();
        return false;
      }
    }

    const WrapHeaderAndSidebar = (component) => {

      return (
          <Box flex={1} display="flex" flexDirection="row">
            <Box>
                <Navbar />
            </Box>
            <Box flex={1} className={classes.appMain}>
              <Header />
              <Box className={classes.container}>
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
            // console.log('--Dash');
            isCheck()
            return WrapHeaderAndSidebar(<Dashboard />)
            case "about":
              isCheck()
              // console.log('--about');
              return WrapHeaderAndSidebar(<About />)
          default: 
            return <div>Component not found</div>
        }
      }

    return (
        <BrowserRouter history={history}>
            <Switch>
            <Route exact path="/login" component={() => getComponent("login") } />
            <Route exact path="/register" component={() => getComponent("register") } />
            <Route exact path="/about" render={props => isCheck() ? (getComponent("about")) : (<Redirect to="/login" />)} />
            <Route exact path="/dashboard" render={props => isCheck() ? (getComponent("dashboard")) : (<Redirect to="/login" />)} />
            <Redirect exact from="/" to="login" />
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
  // console.log('root----', state);
  // console.log('token----', state.User.user.data.token);
  return {
    Auth: state.User.setAuth,
    CheckToken: state.User.checkToken
  }
}

export default connect(mapStateToProps)(Root);