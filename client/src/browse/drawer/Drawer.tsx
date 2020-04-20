import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Hidden } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../navbar';

import ChapterList from './ChapterList';
import SideList from './SideList';
import CheckpointList from './CheckpointList';
import RoomList from './RoomList';

import jsondata from '../../api/chapter-tree.json';
import { DataTree } from '../../api/Data';

const drawerWidthDesktop = 320;
const drawerWidthMobile = '100%';

export const Paths = {
  HOME: '/',
  CHAPTER: '/chapter/:chapterId',
  SIDE: '/chapter/:chapterId/side/:sideNo',
  CHECKPOINT: '/chapter/:chapterId/side/:sideNo/checkpoint/:checkpointNo',
  ROOM: '/chapter/:chapterId/side/:sideNo/checkpoint/:checkpointNo/room/:roomNo',
}

const useStyles = makeStyles((theme) => ({
  drawerDesktop: {
    width: drawerWidthDesktop,
    flexShrink: 0,
  },
  drawerMobile: {
    width: drawerWidthMobile,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  flexItem: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const data: DataTree = jsondata;

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const drawerList = (
    <React.Fragment>
      <Toolbar />
      <div className={ classes.drawerContainer }></div>
        <Switch>
          <Route exact path={ Paths.HOME } render={() => <ChapterList data={ data }/> }/>
          <Route exact path={ Paths.CHAPTER } render={() => <SideList data={ data }/> }/>
          <Route exact path={ Paths.SIDE } render={() => <CheckpointList data={ data }/> }/>
          <Route path={ Paths.CHECKPOINT } render={() => <RoomList data={ data }/> }/>
        </Switch>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Navbar open={ open } toggleDrawer={ toggleDrawer }/>
      <Hidden smUp>
        <Drawer
          className={ classes.drawerMobile }
          open={ open }
          onClose={ toggleDrawer }
          anchor='top'
          ModalProps={{
            keepMounted: true,
          }}
          classes={{
            paper: classes.drawerMobile,
          }}
        >
          { drawerList }
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          className={ classes.drawerDesktop }
          variant='permanent'
          anchor='left'
          open
          classes={{
            paper: classes.drawerDesktop,
          }}
        >
          { drawerList }
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}