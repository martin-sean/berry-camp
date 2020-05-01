import React, { useState } from 'react';

import './App.css';

import { Grid, Toolbar, Paper } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './browse/drawer';
import Room from './browse/room';

import jsondata from './api/chapter-tree.json';
import { DataTree } from './api/Data';
import Skeleton from '@material-ui/lab/Skeleton';
import Navbar from './browse/navbar';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#c800c8',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
    overflow: 'hidden',
  },
  toolbar: {
    height: '64px',
  },
  room: {
    padding: theme.spacing(3),
    height: '100%',
  }
}));

// Set the document title
const setDocTitle = (title: string | undefined) => {
  document.title = 'Berry Camp · ' + title || 'Error';
}

// TODO: Consider state manager like mobx or redux.

// Current navigation position
export interface Navigation {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
}

// Last selected room
export interface LastRoom {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
}

export default () => {
  // Store the current menu navigation
  const [nav, setNav] = useState<Navigation>({ chapterId: '', sideNo: '', checkpointNo: '' });
  // Remember the last room that was selected
  const [lastRoom, setLastRoom] = useState<LastRoom | null>(null);
  // Open and close the mobile drawer
  const [open, setOpen] = useState(false);

  const data: DataTree = jsondata;
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <div className={ classes.root }>
          <Navbar open={ open } setOpen={ setOpen }/>
          <Drawer
            nav={ nav }
            setNav={ setNav }
            setLastRoom={ setLastRoom }
            open={ open }
            setOpen={ setOpen }
            data={ data }
            setTitle={ setDocTitle }
          />
          <div className={ classes.content }>
            <Toolbar className={ classes.toolbar }/>
            <Grid container spacing={3} direction='row-reverse'>
              <Grid item xs={12} lg={5}>
                {
                  lastRoom &&
                  <Paper className={ classes.room }>
                    <Room 
                      lastRoom={ lastRoom }
                      data={ data } 
                      setTitle={ setDocTitle }
                    />
                  </Paper>
                }
              </Grid>
              <Grid item xs={12} lg={7}>
                <Skeleton animation={false} height={ 50 }/>
                <Skeleton animation={false} height={ 50 }/>
                <Skeleton animation={false} height={ 50 }/>
                <Skeleton animation={false} height={ 50 }/>
              </Grid>
            </Grid>
          </div>
        </div>
        <footer />
      </ThemeProvider>
    </React.Fragment>
  );
}