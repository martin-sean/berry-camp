import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Hidden } from '@material-ui/core';
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
  toolbar: {
    // height: '64px',
  },
  toolbarSpacing: {
    minHeight: theme.mixins.toolbar.minHeight,
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
  const theme = useTheme();

  const DrawerList = () => (
    <React.Fragment>
      <div className={ classes.toolbarSpacing }/>
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
          // Use drawer zIndex instead of dialog to go under navbar
          style={{ zIndex: theme.zIndex.drawer }}
          className={ classes.drawerMobile }
          open={ props.open }
          onClose={ () => props.setDrawerOpen(false) }
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
});