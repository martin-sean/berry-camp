import React from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './browse/navbar';
import Sidebar from './browse/sidebar';

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
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <header> 
        <Navbar />
      </header>
      {/* TODO: React router routing */}
      <Sidebar />
      <footer />
    </ThemeProvider>
  );
}