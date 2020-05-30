import React from 'react';
import Welcome from './welcome';
import { makeStyles, Container } from '@material-ui/core';
import NavbarSpacer from 'pages/common/navbarspacer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={ classes.root }>
        <NavbarSpacer />
        <Welcome />
      </div>
    </Container>
  );
}