import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { DataTree } from '../../api/Data';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
  chapterNo: {
    width: '25px',
  }
}));

export default (props: { data: DataTree }) => {
  const classes = useStyles();

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
          Object.keys(props.data).map((chapterId: string, index: number) => (
            <ListItem button component={ Link } to={ '/chapter/' + chapterId } key={ index }>
              <Typography component='div' className={ classes.chapterNo } color="textSecondary">{ props.data[chapterId].chapter_no }</Typography>
              <ListItemText primary={ props.data[chapterId].name }/>
            </ListItem>
          ))
      }
    </List>
  );
}