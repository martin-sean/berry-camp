import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Hidden } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../navbar';

import ChapterList from './ChapterList';
import SideList from './SideList';
import CheckpointList from './CheckpointList';
import RoomList from './RoomList';

import { DataTree } from '../../api/Data';
import { Paths } from '../../App'

const drawerWidthDesktop = 330;
const drawerWidthMobile = '100%';

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

export default (props: { data: DataTree }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const closeDrawer = () => {
    setOpen(false);
  }

  const DrawerList = (props: { data: DataTree, onItemSelect: () => void }) => {
    return (
      <React.Fragment>
        <Toolbar />
        <div className={ classes.drawerContainer }></div>
          <Switch>
            <Route exact path={ Paths.HOME } render={() => <ChapterList data={ props.data }/> }/>
            <Route exact path={ Paths.CHAPTER } render={() => <SideList data={ props.data }/> }/>
            <Route exact path={ Paths.SIDE } render={() => <CheckpointList data={ props.data }/> }/>
            <Route path={ Paths.CHECKPOINT } render={() => <RoomList data={ props.data } onItemSelect={ props.onItemSelect }/> }/>
          </Switch>
      </React.Fragment>
    )
  };

  return (
    <React.Fragment>
      <Navbar open={ open } toggleDrawer={ toggleDrawer }/>
      <Hidden mdUp>
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
          <DrawerList data={ props.data } onItemSelect={ closeDrawer } />
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          className={ classes.drawerDesktop }
          variant='permanent'
          anchor='left'
          open
          classes={{
            paper: classes.drawerDesktop,
          }}
        >
          <DrawerList data={ props.data } onItemSelect={ closeDrawer } />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}