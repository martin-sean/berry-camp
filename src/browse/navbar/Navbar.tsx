import React, { useState } from 'react';

import { AppBar, Fade, Hidden, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { ClearNavAction, ClearRoomAction } from '../../redux/actions';
import { CLEAR_NAV, CLEAR_ROOM } from '../../redux/actionTypes';

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

  const handleTitleClick = () => {
    dispatch<ClearNavAction>({ type: CLEAR_NAV });
    dispatch<ClearRoomAction>({ type: CLEAR_ROOM });
  }

  const Title = () => (
    <div onClick={ handleTitleClick } className={ classes.title }>
      <Typography className={ classes.titleIcon }><span role='img' aria-label='Berry'>🍓</span></Typography>
      <Typography component="div" className={ classes.titleText  }>camp</Typography>
    </div>
  );

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