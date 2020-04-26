import React from 'react';

import './App.css';

import { Grid, Toolbar } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './browse/drawer';
import Room from './browse/room';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Paths } from './browse/router';

import jsondata from './api/chapter-tree.json';
import { DataTree } from './api/Data';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#c800c8',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
  },
  item: {
    padding: theme.spacing(2),
  }
}));

const setDocTitle = (title: string) => {
  document.title = 'Strawberry House · ' + title || 'Error';
}

export default () => {
  const data: DataTree = jsondata;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          {/* Navbar is contained in drawer */}
          <div className={ classes.root } >
            <Drawer data={ data } setTitle={ setDocTitle } />
            <div className={ classes.content } >
              <Toolbar />
              <Grid container>
                <Grid className={ classes.item } item sm={ 12 } md={ 6 }>
                  <Route exact path={ Paths.ROOM } render={() => <Room data={ data } setTitle={ setDocTitle }/> }/>
                </Grid>
                <Grid className={ classes.item } item sm={12} md={ 6 }>

                </Grid>
              </Grid>
            </div>
          </div>
          <footer />
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
}