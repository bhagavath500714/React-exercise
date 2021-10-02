import React from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';


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
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase className={classes.searchInput} placeholder="Search topics" startAdornment={<SearchIcon fontSize="small" />} />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
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
            <IconButton>
              <PowerSettingsNewIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header;