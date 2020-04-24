import React from 'react';

import { AppBar, Hidden, Toolbar, Typography, Button, IconButton, Theme } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1000,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default (props: { open: boolean, toggleDrawer: () => void }) => {
  const classes = useStyles();

  return (
    <AppBar className={ classes.appBar } position='fixed'>
      <Toolbar>
        <Typography className={classes.title} variant='h6'>
          Strawberry House
        </Typography>
        <Button color='inherit'>Login</Button>
        <Hidden smUp>
          <IconButton 
          className={classes.menuButton} 
          edge='end' 
          color='inherit' 
          aria-label='menu' 
          onClick={ props.toggleDrawer }
          >
            { props.open ? <ExpandLess /> : <ExpandMore /> }
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}