import React, { useEffect, useState } from 'react';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../navbar';
import { List, ListSubheader, Hidden, Drawer, ListItem, CircularProgress, Toolbar } from '@material-ui/core';
import SidebarItem from './DrawerItem';

const drawerWidthDesktop = 300;
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

export interface MenuItem {
  id: number;
  name: string;
  chapter_no?: number;
  debug_id?: string;
  children?: MenuItem[];
}

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [chapterTree, setChapterTree] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    fetch('/api/chaptertree')
      .then((res) => res.json())
      .then((chapterTree: MenuItem[]) => setChapterTree(chapterTree));
  },[chapterTree]);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const content = (
    <List
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Chapters
        </ListSubheader>
      }
    >
      {
        // Render content if data is present
        chapterTree.length > 0 ?
          chapterTree.map((item: MenuItem, index: number) => (
            <SidebarItem item={ item } key={ index } indent={ 1 } />
          ))
        :
        // Otherwise render a progress circle
        <ListItem className={ classes.flexItem }>
          <CircularProgress />
        </ListItem>
      }
    </List>
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
          <Toolbar />
          <div className={ classes.drawerContainer }>
            { content }
          </div>
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
          <Toolbar />
          { content }
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}