import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Hidden } from '@material-ui/core';
import ItemList from './ItemList';

import { LastRoom, Navigation } from '../Home';

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
  nav: Navigation,
  setNav: (navigation: Navigation) => void,
  setLastRoom: (lastRoom: LastRoom) => void,
  setTitle: (title: string | undefined) => void,
  open: boolean,
  setOpen: (open: boolean) => void,
}

export default (props: DrawerProps) => {
  const classes = useStyles();

  console.log("DRAWER render");
  
  const DrawerList = () => (
    <React.Fragment>
      <Toolbar className={ classes.toolbar } />
      <div className={ classes.drawerContainer }>
        <ItemList
          nav={ props.nav }
          setNav={ props.setNav }
          setLastRoom={ props.setLastRoom }
          closeDrawer={ () => props.setOpen(false) } 
          setTitle={ props.setTitle }
        />
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Hidden mdUp>
        <Drawer
          className={ classes.drawerMobile }
          open={ props.open }
          onClose={ () => props.setOpen(false) }
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