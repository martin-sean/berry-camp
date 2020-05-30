import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.mixins.toolbar.minHeight,
    width: '100%',
  }
}));

// Create an empty div the height of the navbar for spacing
export default () => {
  const classes = useStyles();
  return (
    <div className={ classes.root }/>
  );
}