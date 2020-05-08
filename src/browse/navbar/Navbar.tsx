import React, { useState } from 'react';

import { AppBar, Fade, Hidden, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

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
    maxWidth: 400,
    height: theme.mixins.toolbar.minHeight,
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1.0) 50%, transparent);',
    // mixBlendMode: 'screen',
  },
  title: {
    display: 'flex',
    position: 'absolute',
    alignSelf: 'center',
  },
  titleIcon: {
    fontSize: '24pt',
    paddingLeft: theme.spacing(2),
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

const logos = [
  'logo_1.gif', 'logo_2.gif', 'logo_5.gif', 'logo_6.gif',
];

interface NavbarProps {
  open: boolean,
  setDrawerOpen: (open: boolean) => void
}

export default React.memo((props: NavbarProps) => {
  const [loaded, setLoaded] = useState(false);
  const logo = logos[Math.floor(Math.random() * logos.length)];
  const classes = useStyles();

  const Title = () => (
    <div className={ classes.title }>
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
                className={ classes.logo }
                src={ process.env.PUBLIC_URL + `/img/${ logo }` }
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