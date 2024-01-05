import React from 'react';
import './App.css';
import { LocalWebSocket } from './websocket/LocalWebsocket';

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

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="`App">
        <LocalWebSocket />
        <GridLayout  />
      </div>
    </ThemeProvider>
  );
}

export default App;
