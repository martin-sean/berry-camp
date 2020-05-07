import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from '../../../redux/reducers';
import { Button, makeStyles } from '@material-ui/core';
import { SetRoomAction, SetNavAction } from '../../../redux/actions';
import { SET_ROOM, SET_NAV } from '../../../redux/actionTypes';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    width: '49%',
    marginTop: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();

  const data = useSelector((state: GlobalStore) => state.data);
  const currentRoom = useSelector((state: GlobalStore) => state.room);
  const dispatch = useDispatch();

  // Don't render if there's no room
  if (!currentRoom) { return null; }

  const chapter = data[currentRoom.chapterId];
  const side = chapter.sides[currentRoom.sideNo];
  const checkpoint = side.checkpoints[currentRoom.checkpointNo];

  const roomNo = parseInt(currentRoom.roomNo);
  const previousRoom = checkpoint.rooms[roomNo - 1];
  const nextRoom = checkpoint.rooms[roomNo + 1];

  const checkpointNo = parseInt(currentRoom.checkpointNo);
  const prevCheckpoint = side.checkpoints[checkpointNo - 1];
  const nextCheckpoint = side.checkpoints[checkpointNo + 1];

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

  const setNav = (checkpointNo: number, roomNo: number) => {
    dispatch<SetNavAction>({
      type: SET_NAV,
      nav: {
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
    <div className={ classes.wrapper }>
      { 
        previousRoom ? <Button variant='outlined' className={ classes.button } onClick={ () => setRoom(roomNo - 1) }>{ prevText }</Button> :
          prevCheckpoint ? <Button variant='outlined' className={ classes.button } onClick={ () => setNav(checkpointNo - 1, Object.keys(prevCheckpoint.rooms).length) }>{ prevText }</Button>: 
          <Button disabled variant='outlined' className={ classes.button }>{ prevText }</Button> 
      }
      { 
        nextRoom ? <Button variant='outlined' className={ classes.button } onClick={ () => setRoom(roomNo + 1) }>{ nextText }</Button> :
          nextCheckpoint ? <Button variant='outlined' className={ classes.button } onClick={ () => setNav(checkpointNo + 1, 1) }>{ nextText }</Button> :
          <Button disabled variant='outlined' className={ classes.button }>{ nextText }</Button> 
      }
    </div>
  );
}