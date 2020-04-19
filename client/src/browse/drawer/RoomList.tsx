import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

interface Room   {
  id: number,
  debug_id: string,
  room_no: number,
  checkpoint_id: number,
  nickname: string,
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
  const [rooms, setRooms] = useState<Room[]>([]);
  const { chapterId, sideNo, checkpointNo } = useParams();

  useEffect(() => {
    console.log('API call, checkpointNo: ' + checkpointNo);
    fetch(`/api/chapters/${ chapterId }/sides/${ sideNo }/checkpoints/${ checkpointNo }/rooms`)
      .then((res) => res.json())
      .then((rooms: Room[]) => setRooms(rooms));
  },[chapterId, sideNo, checkpointNo]);

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }/side/${ sideNo }` }>Side</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }/side/${ sideNo }/checkpoint/${ checkpointNo }` }>Checkpoint</Link>
          <Typography color="textPrimary">Room</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        // Render content if data is present
        rooms.length > 0 ?
          rooms.map((room: Room, index: number) => (
            <ListItem button 
              component={ RouterLink } 
              to={ `/chapter/${ chapterId }/side/${ sideNo }/checkpoint/${ checkpointNo }/room/${ room.room_no }` } 
              key={ index }
            >
              <ListItemText primary={ room.debug_id }/>
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