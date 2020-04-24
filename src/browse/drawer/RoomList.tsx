import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { DataTree } from '../../api/Data';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
}));

export default (props: { data: DataTree}) => {
  const classes = useStyles();
  const { chapterId, sideNo, checkpointNo } = useParams();
  
  if (!(chapterId && sideNo && checkpointNo)) {
    return (
      <ListItem>
        <ListItemText primary="Error loading data" />
      </ListItem>
    );
  }
  
  const rooms = props.data[chapterId]?.sides[sideNo]?.checkpoints[checkpointNo]?.rooms;

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }` }>Side</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }/side/${ sideNo }` }>Checkpoint</Link>
          <Typography color="textPrimary">Room</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        rooms ?
        Object.keys(rooms).map((roomNo: string, index: number) => (
          <ListItem button 
            component={ RouterLink } 
            to={ `/chapter/${ chapterId }/side/${ sideNo }/checkpoint/${ checkpointNo }/room/${ roomNo }` } 
            key={ index }
          >
            <ListItemText 
              primary={ rooms[roomNo].name }
              secondary={ rooms[roomNo].debug_id }
            />
          </ListItem>
        ))
        :
        <ListItem>
          <ListItemText primary='No rooms found' />
        </ListItem>
      }
    </List>
  );
}