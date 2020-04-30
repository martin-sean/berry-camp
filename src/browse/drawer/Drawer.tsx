import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Hidden } from '@material-ui/core';
import Navbar from '../navbar';
import ItemList from './ItemList';

import { DataTree } from '../../api/Data';

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
  toolbar: {
    height: '64px',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  flexItem: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface DrawerProps {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
  setChapterId: (chapterId: string) => void,
  setSideNo: (setSideNo: string) => void,
  setCheckpointNo: (setCheckpointNo: string) => void,
  setRoomNo: (setRoomNo: string) => void,
  data: DataTree, 
  setTitle: (title: string | undefined) => void
}

export default (props: DrawerProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const closeDrawer = () => {
    setOpen(false);
  }

  const DrawerList = () => (
    <React.Fragment>
      <Toolbar className={ classes.toolbar } />
      <div className={ classes.drawerContainer }>
        <ItemList
          chapterId={ props.chapterId }
          sideNo={ props.sideNo }
          checkpointNo={ props.checkpointNo }
          roomNo={ props.roomNo }
          setChapterId={ props.setChapterId }
          setSideNo={ props.setSideNo }
          setCheckpointNo={ props.setCheckpointNo }
          setRoomNo={ props.setRoomNo }
          data={ props.data } 
          closeDrawer={ closeDrawer } 
          setTitle={ props.setTitle }
        />
      </div>
    </React.Fragment>
  );

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
          <DrawerList />
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
          <DrawerList />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}