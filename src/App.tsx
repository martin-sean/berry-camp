import React from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './browse/navbar';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
      <footer />
    </ThemeProvider>
  );
}