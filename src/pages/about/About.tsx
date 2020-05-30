import React from 'react';
import { makeStyles, Paper, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingText: {
    transform: 'transform: scale(1, 0.80)',
    height: 35,
  },
}));

export default () => {
  const classes = useStyles();
  
  return (
    <Container maxWidth="md">
      <div className={ classes.toolbar }/>
      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h5'>About</Typography>
        <Typography className={ classes.paragraph } color='textSecondary'>Todo</Typography>
      </Paper>
    </Container>
  )
}