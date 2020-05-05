import React, { useState, useEffect } from 'react';

import jsondata from '../../api/chapter-tree.json';
import { DataTree } from '../../api/Data';

import { makeStyles, Grid, Toolbar, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useHistory } from 'react-router-dom';

import Navbar from '../navbar';
import Drawer from './drawer';
import Room from './room';

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
  }
}));

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

export default React.memo(() => {
  // Remove the params
  const history = useHistory();

  // Store the current menu navigation
  const [nav, setNav] = useState<Navigation>({ chapterId: '', sideNo: '', checkpointNo: '' });
  // Remember the last room that was selected
  const [lastRoom, setLastRoom] = useState<LastRoom | null>(null);
  // Open and close the mobile drawer
  const [open, setOpen] = useState(false);

  const data: DataTree = jsondata;
  const classes = useStyles();

  // Set the document title
  const setDocTitle = (title: string | undefined) => {
    document.title = 'Berry Camp · ' + title || 'Error';
  }

  // TODO: Use state manager instead
  // Handle query params, Temporary until using Redux
  useEffect(() => {
      // Load Query Params
    const params = new URLSearchParams(window.location.search);
    const chapterId = params.get('chapter') || '';
    const sideNo = params.get('side') || '';
    const checkpointNo = params.get('checkpoint') || '';
    const roomNo = params.get('room');

    // All params
    const queryNav = (chapterId && sideNo && checkpointNo) ? { chapterId: chapterId, sideNo: sideNo, checkpointNo: checkpointNo } :
      // Chapter and side
      (chapterId && sideNo) ? { ...nav, chapterId: chapterId, sideNo: sideNo } :
      // Only chapter
      chapterId ? { ...nav, chapterId: chapterId } : 
      // No params
      nav;

    const queryRoom =  (chapterId && sideNo && checkpointNo && roomNo) ? 
      { chapterId: chapterId, sideNo: sideNo, checkpointNo: checkpointNo, roomNo: roomNo } : null
    
    history.push('/');

    // If any of the params are provided, set the params in state
    if (chapterId || sideNo || checkpointNo || roomNo) {
      setNav(queryNav);
      setLastRoom(queryRoom);
    }
  }, [history, nav]);

  return (
    <React.Fragment>
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
              {
                lastRoom &&
                <React.Fragment>
                  <Skeleton animation={false} height={ 50 }/>
                  <Skeleton animation={false} height={ 50 }/>
                  <Skeleton animation={false} height={ 50 }/>
                  <Skeleton animation={false} height={ 50 }/>
                </React.Fragment>
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
});