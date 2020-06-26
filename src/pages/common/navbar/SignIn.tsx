import React, { useState } from 'react';

import GoogleLogin, { GoogleLoginResponseOffline, GoogleLoginResponse, useGoogleLogout } from 'react-google-login';
import clientId from 'api/client';
import { login, logout, getCurrentUser } from 'api/authenticate';
import { useDispatch } from 'react-redux';
import { clearAccessToken, setAccessToken } from 'redux/actions';
import { Button, Menu, MenuItem, makeStyles, CircularProgress, Backdrop, Typography } from '@material-ui/core';
import { Person, SupervisorAccount } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import * as Path from 'pages/paths';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'inherit',
    textTransform: 'none',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  menuItem: {
    fontSize: '1.25rem',
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#fff',
  },
  backdropContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    padding: '10px'
  },
  progress: {
    height: 100,
  }
}));

interface SignInProps {
  accessToken?: string;
  closeParent?: () => void;
}

// Component that renders a google sign in button or a menu dropdown
export default (props: SignInProps) => {
  const classes = useStyles();

  // Anchor the account dropdown menu to an element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Show the backdrop
  const [showBackdrop, setShowBackdrop] = useState(false);

  // Redux stuff
  const dispatch = useDispatch();

  const currentUser = getCurrentUser(props.accessToken);

  const history = useHistory();

  // Google logout hook
  const { signOut } = useGoogleLogout({
    clientId: clientId,
    fetchBasicProfile: false,
    cookiePolicy: 'single_host_origin',
    scope: 'openid',
  });

  // Handle google login
  const handleLogin = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((res as GoogleLoginResponse).getAuthResponse !== undefined) {
      const auth = (res as GoogleLoginResponse).getAuthResponse();
      const accessToken = await login(auth.id_token);
      accessToken && dispatch(setAccessToken(accessToken));
    }
    setShowBackdrop(false);
  }

  // TODO: Handle situation when google credentials expire and 
  const handleLogout = async () => {
    // Close menus
    setAnchorEl(null);
    props.closeParent && props.closeParent();
    
    // Sign out of Google
    signOut();
    // Logout of app and delete refresh cookie
    await logout();
    // Clear the access token
    dispatch(clearAccessToken());
    // Navigate home
    history.push(Path.HOME);
  }

  // Handle opening the account menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  // Handle closing the account menu
  const handleMenuClose = () => {
    props.closeParent && props.closeParent();
    setAnchorEl(null);
  }
  
  return (
    <React.Fragment>
      <Backdrop
        open={ showBackdrop }
        className={ classes.backdrop }
      >
        <div className={ classes.backdropContent }>
          <Typography className={ classes.message } variant='h6'>Waiting for Google...</Typography>
          <CircularProgress className={ classes.progress } color='primary' />
        </div>
      </Backdrop>
      { currentUser ? (
        <React.Fragment>
          <Button
            className={ classes.button }
            aria-controls='user menu'
            aria-haspopup='true'
            onClick={ handleMenuOpen }
            startIcon={ currentUser.moderator ? <SupervisorAccount /> : <Person /> }
          >
            { currentUser.username || "unknown" }
          </Button>
          <Menu
            keepMounted
            id="account-menu"
            anchorEl={ anchorEl }
            open={ Boolean(anchorEl) }
            onClose={ handleMenuClose }
          >
            <MenuItem
              className={ classes.menuItem }
              onClick={ handleMenuClose }
              component={ Link }
              to={ Path.ACCOUNT }
            >
              Account
            </MenuItem>
            <MenuItem
              className={ classes.menuItem }
              onClick={ handleMenuClose }
              component={ Link }
              to={ `/profile/${ currentUser.username }` }
            >
              Profile
            </MenuItem>
            <MenuItem
              className={ classes.menuItem }
              onClick={ handleLogout }
            >
              Sign out
            </MenuItem>
          </Menu>
        </React.Fragment>   
      ) : (
        <div onClick={ () => setShowBackdrop(true) }>
          <GoogleLogin
            clientId={ clientId }
            buttonText='Sign in'
            onSuccess={ handleLogin }
            onFailure={ handleLogin }
            cookiePolicy='single_host_origin'
            fetchBasicProfile={ false }
            scope='openid'
          />
        </div>
      )}
    </React.Fragment>
  );
}