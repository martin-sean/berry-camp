import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Hidden } from '@material-ui/core';
import ItemList from './ItemList';

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
  drawerDialog: {
    zIndex: theme.zIndex.drawer + 1235,
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
  setTitle: (title: string | undefined) => void,
  open: boolean,
  setDrawerOpen: (open: boolean) => void,
}

export default React.memo((props: DrawerProps) => {
  const classes = useStyles();

  const DrawerList = () => (
    <React.Fragment>
      <Toolbar className={ classes.toolbar } />
      <div className={ classes.drawerContainer }>
        <ItemList
          closeDrawer={ () => props.setDrawerOpen(false) } 
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
          onClose={ () => props.setDrawerOpen(false) }
          anchor='top'
          ModalProps={{
            keepMounted: true,
          }}
          classes={{
            root: classes.drawerDialog,
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
});