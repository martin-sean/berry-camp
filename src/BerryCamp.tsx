import React from 'react';
import './BerryCamp.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Home from './browse/home';

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
    <Router>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Switch>
          <Route path='/' component={ Home } />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}