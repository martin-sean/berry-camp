import React, { useState, useCallback, useEffect } from 'react';

import { CssBaseline, Snackbar, Slide } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

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

import { getNewTokenIfRequired, getCurrentUser } from 'api/authenticate';
import { useDispatch, useSelector } from 'react-redux';
import Registration from 'pages/common/registration';
import { GlobalStore } from 'redux/reducers';
import { clearNotification } from 'redux/actions';
import { Alert } from '@material-ui/lab';
import { FileCopy as FileCopyIcon } from '@material-ui/icons';
import defaultTheme from 'utils/theme';

export default () => {
  // Remember the drawer state
  const [open, setOpen] = useState(false);
  const [showUsernameDialog, setShowUsernameDialog] = useState<boolean>(false);
  // Authentication
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);
  const currentUser = getCurrentUser(accessToken);
  
  const requestUsername = Boolean(accessToken && showUsernameDialog);
  const requiresUsername = Boolean(accessToken && currentUser && !currentUser.username);

  // Accept redux actions
  const dispatch = useDispatch();

  // Theme
  const dark = useSelector((store: GlobalStore) => store.dark);

  // Messages
  const notification = useSelector((store: GlobalStore) => store.notification);

  // Open and close the drawer
  const setDrawerOpen = useCallback((open: boolean) => {
    setOpen(open);
  }, [setOpen]);

  // Set the document title
  const setDocTitle = useCallback((title: string | undefined) => {
    document.title = 'Berry Camp · ' + (title || 'Error');
  }, []);
 
  // Allow the user to change their username
  const setShowUsernameDialogCallback = useCallback((open: boolean) => {
    setShowUsernameDialog(open);
  }, [setShowUsernameDialog]);
 
  // Refresh the access token
  useEffect(() => {
    const refresh = async () => {
      await getNewTokenIfRequired(accessToken, dispatch);
    }
    refresh();
  }, [accessToken, dispatch])

  // Determine notification icon
  const getNotificationIcon = () => {
    switch(notification.icon) {
      case 'file': return <FileCopyIcon />;
    }
    return undefined;
  }

  return ( 
    <ThemeProvider theme={ defaultTheme(dark) }>
      <CssBaseline />
      
      {/* Snackbar message alerts */}
      <Snackbar
        open={ notification.show }
        onClose={ () => dispatch(clearNotification()) }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'left' } }
        autoHideDuration={ notification?.duration }
        TransitionComponent={ Slide }
      >
        <Alert
          variant='filled'
          severity={ notification.type }
          icon={ getNotificationIcon() }
        >
            { notification.message }
          </Alert>
      </Snackbar>

      {/* Open username dialog if requested or required */}
      { (requestUsername || requiresUsername) && (
        <Registration
          accessToken={ accessToken! }
          requiresUsername={ requiresUsername }
          setShowUsernameDialog={ setShowUsernameDialogCallback }
        />
      )}
      {/* Navbar */}
      <Navbar open={ open } setDrawerOpen={ setDrawerOpen } />
      {/* Main content */}
      <Switch>
        <Route exact path={ Path.HOME } component={ Home }/>
        <Route exact path={ Path.ABOUT } component={ About }/>
        <Route exact path={ Path.PRIVACY } component={ Privacy }/>
        <Route exact path={ Path.PROFILE } component={ Profile }/>
        <Route exact path={ Path.ACCOUNT }>
          <Account setShowUsernameDialog={ setShowUsernameDialogCallback }/>
        </Route>
        <Route exact path={ Path.BROWSE }>
          <Browse open={ open } setDrawerOpen={ setDrawerOpen } setTitle={ setDocTitle }/>
        </Route>

        <Route component={ Default }/>
      </Switch>
    </ThemeProvider>
  );
}