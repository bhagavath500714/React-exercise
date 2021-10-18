import React, {useEffect} from 'react';
import { withStyles } from '@mui/styles';
import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import AppsIcon from '@mui/icons-material/Apps';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useHistory, Link } from "react-router-dom";

const style = {
    sideMenu: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      left: 0,
      width: 320,
      height: '100%',
      backgroundColor: '#253053',
      '& .MuiListSubheader-root': {
        height: 64,
        lineHeight: '64px',
        fontSize: 26,
        color: '#253052',
        fontFamily: 'inherit',
        textAlign: 'center'
      },
      '& .MuiList-root':{
        paddingBottom: 0
      }
    },
    active: {
      backgroundColor: '#8590af !important',
      color: '#fff !important',
      '& .MuiSvgIcon-root': {
        color: '#fff !important'
      }
    }
  }
const Navbar = (props) => {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    let [navActive, setNavActive] = React.useState('dashboard');

    useEffect(()=>{
      checkHistory();
    })

    const checkHistory = () => {
      // console.log('---his', history.location.pathname);
      let pathValue = history.location.pathname
      let pathState = pathValue.substr(1);
      // console.log('pathval', pathState);
      setNavActive(pathState);
    }

    const handleNavigation = (element) => {
      // console.log('------elemnet--', element);
      switch(element){
        case "dashboard":
          setNavActive('dashboard');
          history.push("/dashboard");
          break;
        case "about":
          setNavActive('about');
          history.push("/about");
          break;
          case "settings":
          setNavActive('settings');
          setOpen(!open);
          break;
        default:
          setNavActive('dashboard');
        break;
      }
    }

    return (
        <div className={classes.sideMenu}>
          <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#97a2c3' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          EMPLOYEE SYSYTEM
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleNavigation('dashboard')} className={`${(navActive === 'dashboard') && `${classes.active}`}`}>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={() => handleNavigation('about')} className={`${(navActive === 'about') && `${classes.active}`}`}>
        <ListItemIcon>
          <ContentCopyIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={() => handleNavigation('settings')} className={`${(navActive === 'settings') && `${classes.active}`}`}>
        <ListItemIcon>
          <SettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
        </div>
    )
}

export default withStyles(style)(Navbar);
