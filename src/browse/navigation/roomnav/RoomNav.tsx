import React from 'react';
import { Button, makeStyles, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setNav } from 'redux/actions';
import { DataTree } from 'api/chapterdata';
import { Navigation } from 'redux/reducers';

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
  nav: Navigation,
}

export default (props: NavProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // Get the chapter side and checkpoint of the currently selected room
  const chapter = props.data[props.nav.chapterId];
  const side = chapter.sides[props.nav.sideNo];
  const checkpoint = side.checkpoints[props.nav.checkpointNo];

  // Get the previous and next room if they exist
  const roomNo = parseInt(props.nav.roomNo);
  const previousRoom = checkpoint.rooms[roomNo - 1];
  const nextRoom = checkpoint.rooms[roomNo + 1];

  // Get the previous and next checkpoint if they exist
  const checkpointNo = parseInt(props.nav.checkpointNo);
  const prevCheckpoint = side.checkpoints[checkpointNo - 1];
  const nextCheckpoint = side.checkpoints[checkpointNo + 1];

  type StringNumber = string | number;

  // Set the new checkpoint when the bounds of a checkpoint are reached
  const setNavigation = (roomNo: StringNumber, checkpointNo: StringNumber = props.nav.checkpointNo) => {
    dispatch(
      setNav({
        chapterId: props.nav.chapterId,
        sideNo: props.nav.sideNo,
        checkpointNo: checkpointNo.toString(),
        roomNo: roomNo.toString(),
      })
    );
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
            onClick={ () => setNavigation(roomNo - 1) }
          >
            { prevText }
          </Button>
        ) : prevCheckpoint ? (
          // Previous checkpoint exists
          <Button
            variant='outlined'
            className={ classes.button }
            onClick={ () => setNavigation(Object.keys(prevCheckpoint.rooms).length, checkpointNo - 1) }
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
            onClick={ () => setNavigation(roomNo + 1) }
          >
            { nextText }
          </Button>
        ) : nextCheckpoint ? (
          // Next checkpoint exists
          <Button 
            variant='outlined'
            className={ classes.button }
            onClick={ () => setNavigation(1, checkpointNo + 1) }
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