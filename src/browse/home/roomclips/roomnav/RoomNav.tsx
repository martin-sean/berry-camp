import React from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from '../../../../redux/reducers';
import { SetRoomAction, SetNavAction } from '../../../../redux/actions';
import { SET_ROOM, SET_NAV } from '../../../../redux/actionTypes';
import { DataTree } from '../../../../api/Data';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(1),
  },
  button: {
    width: '100%',
  },
}));

interface NavProps {
  data: DataTree,
}

export default (props: NavProps) => {
  const classes = useStyles();

  // Get the current room from the redux store
  const currentRoom = useSelector((store: GlobalStore) => store.room);
  const dispatch = useDispatch();

  // Don't render if there's no room
  if (!currentRoom) { return null; }

  // Get the chapter side and checkpoint of the currently selected room
  const chapter = props.data[currentRoom.chapterId];
  const side = chapter.sides[currentRoom.sideNo];
  const checkpoint = side.checkpoints[currentRoom.checkpointNo];

  // Get the previous and next room if they exist
  const roomNo = parseInt(currentRoom.roomNo);
  const previousRoom = checkpoint.rooms[roomNo - 1];
  const nextRoom = checkpoint.rooms[roomNo + 1];

  // Get the previous and next checkpoint if they exist
  const checkpointNo = parseInt(currentRoom.checkpointNo);
  const prevCheckpoint = side.checkpoints[checkpointNo - 1];
  const nextCheckpoint = side.checkpoints[checkpointNo + 1];

  // Set just the room if the next or previous room exists in the checkpoint
  const setRoom = (roomNo: number) => {
    dispatch<SetRoomAction>({ 
      type: SET_ROOM, 
      room: {
        chapterId: currentRoom.chapterId,
        sideNo: currentRoom.sideNo,
        checkpointNo: currentRoom.checkpointNo,
        roomNo: roomNo.toString(),
      }
    })
  }

  // Set the new checkpoint when the bounds of a checkpoint are reached
  const setCheckpointAndRoom = (checkpointNo: number, roomNo: number) => {
    dispatch<SetNavAction>({
      type: SET_NAV,
      nav: {
        chapterId: currentRoom.chapterId,
        sideNo: currentRoom.sideNo,
        checkpointNo: checkpointNo.toString(),
      }
    });
    dispatch<SetRoomAction>({
      type: SET_ROOM,
      room: {
        chapterId: currentRoom.chapterId,
        sideNo: currentRoom.sideNo,
        checkpointNo: checkpointNo.toString(),
        roomNo: roomNo.toString(),
      }
    });
  }

  const prevText = '◄ Prev';
  const nextText = 'Next ►';

  return (
    <Grid container className={ classes.grid } spacing={ 2 }>
      {/* Previous room button */}
      <Grid item xs={ 6 }>
        { previousRoom ? (
          // Previous room exists
          <Button 
            variant='outlined'
            className={ classes.button }
            onClick={ () => setRoom(roomNo - 1) }
          >
            { prevText }
          </Button>
        ) : prevCheckpoint ? (
          // Previous checkpoint exists
          <Button
            variant='outlined'
            className={ classes.button }
            onClick={ () => setCheckpointAndRoom(checkpointNo - 1, Object.keys(prevCheckpoint.rooms).length) }
          >
            { prevText }
          </Button>
        ) : (
          // No previous room or checkpoint
          <Button
            disabled
            variant='outlined'
            className={ classes.button }
          >
            { prevText }
          </Button> 
        )}
      </Grid>

      {/* Next room button */}
      <Grid item xs={ 6 }>
        { nextRoom ? (
          // Next room exists
          <Button 
            variant='outlined'
            className={ classes.button }
            onClick={ () => setRoom(roomNo + 1) }
          >
            { nextText }
          </Button>
        ) : nextCheckpoint ? (
          // Next checkpoint exists
          <Button 
            variant='outlined'
            className={ classes.button }
            onClick={ () => setCheckpointAndRoom(checkpointNo + 1, 1) }
          >
            { nextText }
          </Button> 
        ) : (
          // No next room or checkpoint
          <Button 
            disabled
            variant='outlined'
            className={ classes.button }
          >
            { nextText }
          </Button> 
        )}
      </Grid>
    </Grid>
  );
}