import React, { useEffect } from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Drawer from './drawer';
import { GlobalStore } from 'redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { SetNavAction, SetDataAction, setData, setNav } from 'redux/actions';
import fetchJson from 'utils/fetch-json';
import Navigation from './navigation';
import { DataTree } from 'api/data';
import Breadcrumbs from './breadcrumbs';
import * as Path from 'pages/paths';

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
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  room: {
    padding: theme.spacing(3),
  },
  welcomePaper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

interface BrowseProps {
  open: boolean;
  setDrawerOpen: (open: boolean) => void;
  setTitle: (title: string | undefined) => void;
}

export default (props: BrowseProps) => {
  const classes = useStyles();

  // Accept redux actions
  const dispatch = useDispatch();

  // Get redux state
  const data = useSelector((store: GlobalStore) => store.data);
  const nav = useSelector((store: GlobalStore) => store.nav);

  // Use browser history
  const history = useHistory();
  
  // Handle query params
  useEffect(() => {
    // Fetch chapter tree data
    if (!data) {
      fetchJson<DataTree>(dataURL).then((data: DataTree) => {
        dispatch<SetDataAction>(setData(data));
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
      dispatch<SetNavAction>(
        setNav({
          chapterId: chapterId,
          ...( sideNo && { sideNo: sideNo }),
          ...( checkpointNo && { checkpointNo: checkpointNo }),
          ...( roomNo && { roomNo: roomNo })
        })
      );
      // Consume the params from the URL
      history.replace(Path.BROWSE);
    }
  }, [dispatch, data, history]);

  return (
    <React.Fragment>
      <div className={ classes.root }>
        {/* Left sidebar menu */}
        <Drawer
          open={ props.open }
          setDrawerOpen={ props.setDrawerOpen }
          setTitle={ props.setTitle }
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
                {/* Render naviation */}
                <Navigation data={ data } nav={ nav } setDocTitle={ props.setTitle }/> 
              </React.Fragment>
            ) : (
              <Paper className={ classes.welcomePaper }>
                <Typography variant='h6' color='textSecondary'>Select a chapter from the menu to get started</Typography>
              </Paper>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}