import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Divider, CircularProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

interface Chapter {
  id: string,
  chapter_no?: number,
  name: string,
  official: boolean,
  created_at: Date,
  updated_at: Date,
}

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
  chapterNo: {
    width: '9%',
  }
}));

export default () => {
  const classes = useStyles();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  
  useEffect(() => {
    console.log('API CALL');
    fetch('/api/chapters')
      .then((res) => res.json())
      .then((chapterTree: Chapter[]) => setChapters(chapterTree));
  },[]);

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Typography color="textPrimary">Chapter</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        // Render content if data is present
        chapters.length > 0 ?
          chapters.map((chapter: Chapter, index: number) => (
            <ListItem button component={ Link } to={ '/chapter/' + chapter.id } key={ index }>
              <Typography component='div' className={ classes.chapterNo } color="textSecondary">{ chapter.chapter_no }</Typography>
              <ListItemText primary={ chapter.name }/>
            </ListItem>
          ))
        :
        // Otherwise render a progress circle
        <ListItem className={ classes.progress }>
          <CircularProgress />
        </ListItem>
      }
    </List>
  );
}