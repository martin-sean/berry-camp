import React, { useState, useCallback, useEffect } from 'react';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

import { Switch, Route } from 'react-router-dom';
import * as Path from 'pages/paths';

import Home from 'pages/home';
import About from 'pages/about';
import Privacy from 'pages/privacy';
import Browse from 'browse';
import Navbar from 'pages/common/navbar';
import Profile from 'pages/profile';
import Account from 'pages/account';
import Default from 'pages/default';

import { getNewAccessToken, getCurrentUser } from 'authentication/authenticate';
import { setAccessToken, SetAccessTokenAction } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Registration from 'pages/common/registration';
import { GlobalStore } from 'redux/reducers';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#c800c8',
    },
    secondary: {
      main: '#F64D3A',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      },
    },
  },
});

export default () => {
  // Remember the drawer state
  const [open, setOpen] = useState(false);
  
  // Accept redux actions
  const dispatch = useDispatch();

  // Open and close the drawer
  const setDrawerOpen = useCallback((open: boolean) => {
    setOpen(open);
  }, [setOpen]);

  // Set the document title
  const setDocTitle = useCallback((title: string | undefined) => {
    document.title = 'Berry Camp · ' + (title || 'Error');
  }, []);

  // Refresh the access token
  useEffect(() => {
    getNewAccessToken((accessToken: string) => dispatch<SetAccessTokenAction>(setAccessToken(accessToken)));
  }, [dispatch])

  const accessToken = useSelector((store: GlobalStore) => store.accessToken);
  const currentUser = getCurrentUser(accessToken);

  return ( 
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      {/* If the current user has no username, request it */}
      { accessToken && currentUser && !currentUser.username && (<Registration accessToken={ accessToken }/>)}
      {/* Navbar */}
      <Navbar open={ open } setDrawerOpen={ setDrawerOpen } />
      {/* Main content */}
      <Switch>
        <Route exact path={ Path.HOME } component={ Home }/>
        <Route exact path={ Path.ABOUT } component={ About }/>
        <Route exact path={ Path.PRIVACY } component={ Privacy }/>
        <Route exact path={ Path.PROFILE } component={ Profile }/>
        <Route exact path={ Path.ACCOUNT } component={ Account }/>
        <Route exact path={ Path.BROWSE }>
          <Browse open={ open } setDrawerOpen={ setDrawerOpen } setTitle={ setDocTitle }/>
        </Route>

        <Route component={ Default }/>
      </Switch>
    </ThemeProvider>
  );
}