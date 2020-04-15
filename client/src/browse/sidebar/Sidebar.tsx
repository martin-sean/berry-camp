import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListSubheader, CircularProgress } from '@material-ui/core';
import { Chapter } from '../../api/ChapterTree';
import ItemChapter from './ItemChapter';

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

export default () => {
  const classes = useStyles();
  const [chapterTree, setChapterTree] = useState<Chapter[]>([]);

  useEffect(() => {
    fetch('/api/chaptertree')
      .then((res) => res.json())
      .then((chapterTree: Chapter[]) => setChapterTree(chapterTree));
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
        chapterTree.length > 0 ?
          chapterTree.map((chapter: Chapter, index: number) => (
            <ItemChapter chapter={ chapter } key={ index } />
          ))
        :
          <React.Fragment>
            <ListItem className={ classes.flexItem }>
              <CircularProgress className={ classes.progress } />
            </ListItem>
          </React.Fragment>
      }
      {
        
      }
    </List>
  );

}