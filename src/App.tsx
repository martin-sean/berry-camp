import React from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './browse/navbar';
import Sidebar from './browse/sidebar';
import Modal from './watch/modal'
import { Grid } from '@material-ui/core';

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
        {/* TODO: React router routing */}
        <Grid container>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Modal />
          </Grid>
        </Grid>
        <footer />
      </ThemeProvider>
    </React.Fragment>
  );
}