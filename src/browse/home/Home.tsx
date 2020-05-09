import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar';
import Drawer from './drawer';
import { CurrentRoom, GlobalStore } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { SetNavAction, SetRoomAction, SetDataAction } from '../../redux/actions';
import { SET_NAV, SET_ROOM, SET_DATA } from '../../redux/actionTypes';
import fetchJson from '../../utils/fetch-json';
import Welcome from './welcome';
import Navigation from './navigation';
import RoomClips from './roomclips';
import { DataTree } from '../../api/Data';

const dataURL = 'https://cdn.berrycamp.com/file/berrycamp/data/data.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
    overflow: 'hidden',
  },
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  room: {
    padding: theme.spacing(3),
  },
}));

export default () => {
  const classes = useStyles();

  // Accept redux actions
  const dispatch = useDispatch();

  // Get redux state
  const data = useSelector((store: GlobalStore) => store.data);
  const currentRoom = useSelector((store: GlobalStore) => store.room);
  const nav = useSelector((store: GlobalStore) => store.nav);

  // Use browser history
  const history = useHistory();

  // Remember the drawer state
  const [open, setOpen] = useState(false);

  // Open and close the drawer
  const setDrawerOpen = useCallback((open: boolean) => {
    setOpen(open);
  }, [setOpen]);

  // Set the document title
  const setDocTitle = useCallback((title: string | undefined) => {
    document.title = 'Berry Camp · ' + (title || 'Error');
  }, []);
  
  // Handle query params
  useEffect(() => {
    // Fetch data on first load
    if (!data) {
      fetchJson<DataTree>(dataURL).then((data: DataTree) => {
        dispatch<SetDataAction>({ type: SET_DATA, data: data })
      });
    }
    
    // Load Query Params
    const params = new URLSearchParams(window.location.search);
    const chapterId = params.get('chapter');
    const sideNo = params.get('side');
    const checkpointNo = params.get('checkpoint');
    const roomNo = params.get('room');

    // If any of the params are provided, set the navigation
    if (chapterId || sideNo || checkpointNo || roomNo) {
      dispatch<SetNavAction>({
        type: SET_NAV,
        nav: {
          ...( chapterId && { chapterId: chapterId }),
          ...( sideNo && { sideNo: sideNo }),
          ...( checkpointNo && { checkpointNo: checkpointNo })
        }
      });
    }
    
    // If all the params are provided, set the room
    if (chapterId && sideNo && checkpointNo && roomNo) {
      const room: CurrentRoom = { chapterId: chapterId, sideNo: sideNo, checkpointNo: checkpointNo, roomNo: roomNo };
      dispatch<SetRoomAction>({ type: SET_ROOM , room: room })
    }

    // Consume the params from the URL
    history.replace('/');

  }, [dispatch, data, history]);

  return (
    <React.Fragment>
      <div className={ classes.root }>
        <Navbar open={ open } setDrawerOpen={ setDrawerOpen }/>
        {/* Left sidebar menu */}
        <Drawer
          open={ open }
          setDrawerOpen={ setDrawerOpen }
          setTitle={ setDocTitle }
        />
        
        {/* Right side content */}
        <div className={ classes.wrapper }>
          <div className={ classes.toolbar }/>
          <div className={ classes.content }>
           {/* Decide view to render and pass redux state to components */}
            { data && currentRoom ? (
              <RoomClips data={ data } room={ currentRoom } setDocTitle={ setDocTitle }/> 
            ) : data && nav ? (
              <Navigation data={ data } nav={ nav}/> 
            ) : (
              <Welcome />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}