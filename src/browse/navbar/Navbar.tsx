import React from 'react';

import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.menuButton} edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            Strawberry House
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}