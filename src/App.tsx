import React from 'react';
import './App.css';

import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material';

import GridLayout from './components/grid/GridLayout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#3e6cc2',
      dark: '#5284c4',
    },
    secondary: {
      main: '#f57c00',
      light: '#ff9800',
      dark: '#c64a00',
    },
    background: {
      default: '#212121',
      paper: '#303030',
    },
  }
});

function App() {
  // const gridProps = { 
  //       className: "layout",
  //       cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  //       rowHeight: 100
  //   }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="`App">
        {/* <header className="App-header">
        <h1>Hello</h1>
        </header> */}
        <GridLayout  />
      </div>
    </ThemeProvider>
  );
}

export default App;
