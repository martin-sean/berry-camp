import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Divider, Link, List, ListItem, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

interface Side {
  id: number,
  chapter_id: string,
  name: string,
  side_no: number,
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
}));

export default () => {
  const classes = useStyles();
  const [sides, setSides] = useState<Side[]>([]);
  const { chapterId } = useParams();

  useEffect(() => {
    console.log('API call, chapterId: ' + chapterId);
    fetch(`/api/chapters/${chapterId}/sides`)
      .then((res) => res.json())
      .then((sides: Side[]) => setSides(sides));
  },[chapterId]);

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Typography color="textPrimary">Side</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        // Render content if data is present
        sides.length > 0 ? 
          sides.map((side: Side, index: number) => (
            <ListItem button component={ RouterLink } to={ `/chapter/${chapterId}/side/${side.side_no}` } key={ index }>
              <ListItemText primary={ side.name }/>
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