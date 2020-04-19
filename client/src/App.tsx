import React from 'react';

import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './browse/navbar';
import Sidebar from './browse/sidebar';
import { Grid } from '@material-ui/core';
import Router  from './browse/router';

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
        <header> 
          <Navbar />
        </header>
        <Grid container>
          {/* TODO: Structure this better */}
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Router />
          </Grid>
        </Grid>
        <footer />
      </ThemeProvider>
    </React.Fragment>
  );
}