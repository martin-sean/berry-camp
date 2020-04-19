import React, { useEffect, useState } from 'react';

import './App.css';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './browse/drawer';

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
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        {/* Navbar is contained in drawer */}
        <Drawer />
        {/* <Modal /> */}
        <footer />
      </ThemeProvider>
    </React.Fragment>
  );
}