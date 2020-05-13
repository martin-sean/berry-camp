import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar';
import Drawer from './drawer';
import { GlobalStore } from 'redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { SetNavAction, SetDataAction } from 'redux/actions';
import { SET_NAV, SET_DATA } from 'redux/actionTypes';
import fetchJson from 'utils/fetch-json';
import Welcome from './welcome';
import Navigation from './navigation';
import RoomClips from './roomclips';
import { DataTree } from 'api/Data';
import Breadcrumbs from './breadcrumbs';

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
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  content: {
    flex: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    overflow: 'hidden',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    // Fetch chapter tree data
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

    // Set nav if at least chapter is provided
    if (chapterId) {
      dispatch<SetNavAction>({
        type: SET_NAV,
        nav: {
          chapterId: chapterId,
          ...( sideNo && { sideNo: sideNo }),
          ...( checkpointNo && { checkpointNo: checkpointNo }),
          ...( roomNo && { roomNo: roomNo })
        }
      });
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
            {/* Render welcome page if data and nav chapter not set */}
            { data && nav.chapterId ? (
              <React.Fragment>
                {/* Navigation breadcrumbs */}
                <Breadcrumbs data={ data } nav={ nav } />
                <Divider className={ classes.divider } />
                {/* Render room and clips */}
                { nav.roomNo ? (
                  <RoomClips data={ data } nav={ nav } setDocTitle={ setDocTitle }/>
                ) : (
                  <Navigation data={ data } nav={ nav }/> 
                )}
              </React.Fragment>
            ) : (
              <Welcome />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}