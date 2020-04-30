import React, { useState } from 'react';

import './App.css';

import { Grid, Toolbar } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './browse/drawer';
import Room from './browse/room';

import { BrowserRouter as Router } from 'react-router-dom';

import jsondata from './api/chapter-tree.json';
import { DataTree } from './api/Data';
import Skeleton from '@material-ui/lab/Skeleton';

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
  },
  toolbar: {
    height: '64px',
  },
  item: {
    padding: theme.spacing(2),
  }
}));

const setDocTitle = (title: string | undefined) => {
  document.title = 'Berry Camp · ' + title || 'Error';
}

// TODO: Last room + navigation state management - I might need redux/mobx
export interface LastRoom {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
}

export default () => {
  const [lastRoom, setLastRoom] = useState<LastRoom | null>(null);
  const [chapterId, setChapterId] = useState("");
  const [sideNo, setSideNo] = useState("");
  const [checkpointNo, setCheckpointNo] = useState("");
  const [roomNo, setRoomNo] = useState("");


  const data: DataTree = jsondata;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          {/* Navbar is contained in drawer */}
          <div className={ classes.root } >
            <Drawer
              setLastRoom={ setLastRoom }
              chapterId={ chapterId }
              sideNo={ sideNo }
              checkpointNo={ checkpointNo }
              roomNo={ roomNo }
              setChapterId={ setChapterId }
              setSideNo={ setSideNo }
              setCheckpointNo={ setCheckpointNo }
              setRoomNo={ setRoomNo }
              data={ data }
              setTitle={ setDocTitle }
            />
            <div className={ classes.content } >
              <Toolbar className={ classes.toolbar } />
              <Grid container direction="row-reverse">
                <Grid item className={ classes.item } xs={12} lg={5} spacing={2}>
                  {
                    lastRoom &&
                    <Room 
                      lastRoom={ lastRoom }
                      data={ data } 
                      setTitle={ setDocTitle }
                    />
                  }
                </Grid>
                <Grid item className={ classes.item } xs={12} lg={7} spacing={2}>
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
      </Router>
    </React.Fragment>
  );
}