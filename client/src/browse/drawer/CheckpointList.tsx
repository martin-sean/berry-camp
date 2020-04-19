import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

interface Checkpoint {
  id: number,
  side_id: number,
  name: string,
  abbreviation: string,
  checkpoint_no: number,
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
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const { chapterId, sideNo } = useParams();

  useEffect(() => {
    console.log('API call, sideId: ' + sideNo);
    fetch(`/api/chapters/${ chapterId }/sides/${ sideNo }/checkpoints`)
      .then((res) => res.json())
      .then((checkpoints: Checkpoint[]) => setCheckpoints(checkpoints));
  },[chapterId, sideNo]);

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }`}>Side</Link>
          <Typography color="textPrimary">Checkpoint</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        // Render content if data is present
        checkpoints.length > 0 ?
          checkpoints.map((checkpoint: Checkpoint, index: number) => (
            <ListItem button 
              component={ RouterLink } 
              to={ `/chapter/${ chapterId }/side/${ sideNo }/checkpoint/${ checkpoint.checkpoint_no }` } 
              key={ index }
            >
              <ListItemText primary={ checkpoint.name }/>
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