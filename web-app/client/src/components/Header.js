import React, {useState} from 'react'
import { AppBar, Toolbar, Typography, Grid, InputBase, IconButton, Badge, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router';
import { useDispatch, useSelector, connect } from 'react-redux'



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff !important',
    transform:'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1)
    }
  },
  actionWrap: {
      '& .MuiIconButton-root': {
        border: '1px solid #E5E8EC',
        borderRadius: 10,
        color: '#007FFF',
        background: '#FFF',
        marginLeft: 10
      }
  }
}))
//  -----------with classes- style-----
// btnRoot: {
//   backgroundColor: 'green'
// },
// btnLabel: {
//   backgroundColor: 'red'
// }

// <IconButton classes={{root: classes.btnRoot,label:classes.btnLabel}}>
//               <PowerSettingsNewIcon fontSize="small"/>
//             </IconButton>

const Header = () => {
  const classes = useStyles();
  const history = useHistory()
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  function handleLogout(){
    window.sessionStorage.clear();
    dispatch({ type: 'RESET_USER', value: null})
    history.replace("/")
  }

  return (
      <>
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <InputBase className={classes.searchInput} placeholder="Search topics" startAdornment={<SearchIcon fontSize="small" />} />
          </Grid>
          
          <Grid item className={classes.actionWrap}>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton id="open-profile" onClick={()=>setopen(!open)}>
              <PersonOutlineIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Menu open={open}  
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        style={{top:48}}
        onClose={()=>setopen(false)}
        anchorEl={document.getElementById("open-profile")}
      >
          <MenuItem>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default Header;