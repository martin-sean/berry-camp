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

export default (props: { data: DataTree, setTitle: (title: string | undefined) => void }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const closeDrawer = () => {
    setOpen(false);
  }

  const DrawerList = (props: { data: DataTree, onItemSelect: () => void , setTitle: (title: string | undefined) => void }) => {
    return (
      <React.Fragment>
        <Toolbar className={ classes.toolbar } />
        <div className={ classes.drawerContainer }>
          <ItemList data={ props.data } onItemSelect={ props.onItemSelect } setTitle={ props.setTitle }/>
        </div>
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
          <DrawerList data={ props.data } onItemSelect={ closeDrawer } setTitle={ props.setTitle }/>
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
          <DrawerList data={ props.data } onItemSelect={ closeDrawer } setTitle={ props.setTitle }/>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}