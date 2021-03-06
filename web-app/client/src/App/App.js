import './App.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Root from '../Root'
import { Provider } from 'react-redux'
import store from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

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

let persistor = persistStore(store)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <PersistGate loading={<div><p>Loading...</p></div>} persistor={persistor}>
        <Root />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
