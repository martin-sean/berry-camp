import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: 900,
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  
  return (
    <div className={ classes.root }>
      <div className={ classes.toolbar }/>
      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h5'>Page does not exist</Typography>
        <Typography className={ classes.paragraph } color='textSecondary'>How did you even get here?</Typography>
      </Paper>
    </div>
  )
}