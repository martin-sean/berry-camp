import React, { useState } from 'react';

import { AppBar, Fade, Hidden, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1000,
    height: '64px',
  },
  toolBar: {
    paddingLeft: 0,
    height: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  menuButton: {
    
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: '24pt',
    color: 'white',
    paddingLeft: theme.spacing(2),
  },
  mobileTitle: {
    flexGrow: 1,
    fontSize: '24pt',
    color: 'white',
    paddingLeft: theme.spacing(2),
  },
  logo: {
    objectFit: 'cover',
    width: 400,
    WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1.0) 50%, transparent);',
    // maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
    // filter: 'blur(1px)',
    // WebkitFilter: 'blur(1px)',
    // mixBlendMode: 'screen',
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

  return (
    <AppBar className={ classes.appBar } position='fixed'>
      <Toolbar className={ classes.toolBar }>
        <Hidden smDown>
          <div className={ classes.container }>
            <Fade in={ loaded }>
              <img
                className={ classes.logo }
                src={ process.env.PUBLIC_URL + `/img/${ logo }` }
                alt='Animation of madeline in a campsite in game'
                onLoad={ () => setLoaded(true) }
              />
            </Fade>
            <Typography component="div" className={ classes.title  }><span role='img' aria-label='Berry'>🍓</span> camp</Typography>
          </div>
        </Hidden>
        <Hidden mdUp>
          <Typography component="div" className={ classes.mobileTitle }><span role='img' aria-label='Berry'>🍓</span> camp</Typography>
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
      </Toolbar>
    </AppBar>
  );
});