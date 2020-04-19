import React from 'react';

import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './browse/drawer';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#c800c8',
    },
  },
});

export default () => {
  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          {/* Navbar is contained in drawer */}
          <Drawer />
          {/* <Modal /> */}
          <footer />
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}