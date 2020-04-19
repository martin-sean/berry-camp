import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListSubheader, CircularProgress } from '@material-ui/core';
import SidebarItem from './SidebarItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  flexItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {

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
  const [chapterTree, setChapterTree] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('/api/chaptertree')
      .then((res) => res.json())
      .then((chapterTree: MenuItem[]) => setChapterTree(chapterTree));
  },[chapterTree]);

  return (
    <List
      className={ classes.root }
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Chapters
        </ListSubheader>
      }
    >
      {
        // Render sidebar if data is present
        chapterTree.length > 0 ?
          chapterTree.map((item: MenuItem, index: number) => (
            <SidebarItem item={ item } key={ index } indent={ 1 } />
          ))
        :
        // Otherwise render a progress circle
        <ListItem className={ classes.flexItem }>
          <CircularProgress className={ classes.progress } />
        </ListItem>
      }
    </List>
  );

}