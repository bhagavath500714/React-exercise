import './App.scss';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Employee from '../pages/Employees/Employee';
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';


const theme = createTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    default: {
      light: 'rgba(0, 0, 0, 0.08)',
      main: 'rgba(0, 0, 0, 0.12)',
      dark: 'rgba(0, 0, 0, 0.15)',
      contrastText: 'rgba(0, 0, 0, 0.36)',
    },
    background: {
      default: "#f4f5fd",
    }
  },
  typography: {
    "fontFamily": `"Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   },
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: 320,
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    <SideMenu />
    <div className={classes.appMain}>
      <Header />
      <Employee />
    </div>
    <CssBaseline />
   </ThemeProvider>
  );
}

export default App;
