import React, { useState } from 'react';

import { AppBar, Fade, Hidden, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ClearNavAction, clearNav, ClearAccessTokenAction, clearAccessToken, SetAccessTokenAction, setAccessToken } from 'redux/actions';

import GoogleLogin, { GoogleLoginResponseOffline, GoogleLoginResponse, GoogleLogout } from 'react-google-login';
import clientId from 'authentication/client';
import { login, logout } from 'authentication/authenticate';
import { GlobalStore } from 'redux/reducers';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    minHeight: theme.mixins.toolbar.minHeight,
  },
  toolBar: {
    paddingLeft: 0,
    minHeight: theme.mixins.toolbar.minHeight,
    display: 'flex',
  },
  toolbarWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flex: 1,
    maxWidth: 330,
    height: theme.mixins.toolbar.minHeight,
  },
  logo: {
    objectFit: 'cover',
    width: '100%',
    minHeight: theme.mixins.toolbar.minHeight,
    maxHeight: theme.mixins.toolbar.minHeight,
  },
  title: {
    display: 'flex',
    alignSelf: 'center',
    position: 'absolute',
    left: theme.spacing(2),
    cursor: 'pointer',
  },
  titleIcon: {
    fontSize: '24pt',
    paddingRight: theme.spacing(1),
  },
  titleText: {
    letterSpacing: theme.spacing(0.5),
    fontSize: '24pt',
    color: 'white',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  menuButton: {

  },
}));

interface NavbarProps {
  open: boolean,
  setDrawerOpen: (open: boolean) => void
}

export default React.memo((props: NavbarProps) => {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);

  const handleTitleClick = () => {
    dispatch<ClearNavAction>(clearNav());
  }

  const Title = () => (
    <div onClick={ handleTitleClick } className={ classes.title }>
      <Typography className={ classes.titleIcon }><span role='img' aria-label='Berry'>🍓</span></Typography>
      <Typography component="div" className={ classes.titleText  }>camp</Typography>
    </div>
  );

  // Set an access token in the redux state
  const setToken = (accessToken: string) => {
    dispatch<SetAccessTokenAction>(setAccessToken(accessToken));
  }

  // Handle google login
  const handleLogin = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ((res as GoogleLoginResponse).getAuthResponse()) {
      const auth = (res as GoogleLoginResponse).getAuthResponse();
      login(auth.id_token, setToken);
      console.log((res as GoogleLoginResponse).googleId);
    } else if ((res as GoogleLoginResponseOffline).code) {
      // Handle error
    }
  }

  // TODO: Handle situation when google credentials expire and 
  const handleLogout = () => {
    logout();
    dispatch<ClearAccessTokenAction>(clearAccessToken());
  }

  return (
    <AppBar className={ classes.appBar } position='fixed'>
      <Toolbar className={ classes.toolBar }>
        <div className={ classes.toolbarWrapper }>
          <Fade in={ loaded }>
            <div className={ classes.imageWrapper }>
              <img
                className={ `${ classes.logo } pixelated` }
                src={ process.env.PUBLIC_URL + '/img/logo.png' }
                alt='Animation of madeline in a campsite in game'
                onLoad={ () => setLoaded(true) }
              />
            </div>
          </Fade>
          <Title />

          { accessToken ? (
            <GoogleLogout
              clientId={ clientId }
              onLogoutSuccess={ handleLogout }
              buttonText='Sign out'
            />
          ) : (
            <GoogleLogin
              clientId={ clientId }
              buttonText='Sign in'
              onSuccess={ handleLogin }
              onFailure={ handleLogin }
              cookiePolicy='single_host_origin'
              fetchBasicProfile={ false }
              scope='openid'
            />
          )}
          
          <Hidden mdUp>
            <IconButton 
              className={ classes.menuButton } 
              edge='end' 
              color='inherit' 
              aria-label='menu' 
              onClick={ () => props.setDrawerOpen(!props.open) }
            >
              { props.open ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  );
});