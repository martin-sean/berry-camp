import React, { useState, useEffect } from 'react';

import { makeStyles, Grid, Toolbar, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useHistory } from 'react-router-dom';

import Navbar from '../navbar';
import Drawer from './drawer';
import Room from './room';

import { GlobalStore, LastRoom } from '../../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { SetNavAction, SetRoomAction } from '../../redux/actions';
import { SET_NAV, SET_ROOM } from '../../redux/actionTypes';

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

export default React.memo(() => {
  // Redux
  const lastRoom = useSelector((state: GlobalStore) => state.room);
  const dispatch = useDispatch();

  // // Remove the params
  const history = useHistory();

  // Open and close the mobile drawer
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  // Set the document title
  const setDocTitle = (title: string | undefined) => {
    document.title = 'Berry Camp · ' + (title || 'Error');
  }

  // TODO: Use state manager instead
  // Handle query params, Temporary until using Redux
  useEffect(() => {
      // Load Query Params
    const params = new URLSearchParams(window.location.search);
    const chapterId = params.get('chapter');
    const sideNo = params.get('side');
    const checkpointNo = params.get('checkpoint');
    const roomNo = params.get('room');

    // Set the nav
    dispatch<SetNavAction>({ type: SET_NAV,
      nav: {
        ...( chapterId && { chapterId: chapterId }),
        ...( sideNo && { sideNo: sideNo }),
        ...( checkpointNo && { checkpointNo: checkpointNo })
      }
    });

    // If any of the params are provided, set the room
    if (chapterId && sideNo && checkpointNo && roomNo) {
      const room: LastRoom = { chapterId: chapterId, sideNo: sideNo, checkpointNo: checkpointNo, roomNo: roomNo };
      dispatch<SetRoomAction>({ type: SET_ROOM , room: room })
    }

    history.push('/');

  }, [history]);

  return (
    <React.Fragment>
      <div className={ classes.root }>
        <Navbar open={ open } setOpen={ setOpen }/>
        <Drawer
          open={ open }
          setOpen={ setOpen }
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