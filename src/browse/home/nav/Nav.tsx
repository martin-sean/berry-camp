import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from '../../../redux/reducers';
import { Button } from '@material-ui/core';
import { SetRoomAction } from '../../../redux/actions';
import { SET_ROOM } from '../../../redux/actionTypes';

export default () => {
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
  
  return (
    <React.Fragment>
      { previousRoom && <Button onClick={ () => setRoom(roomNo - 1) }>◄ Prev</Button> }
      { nextRoom && <Button onClick={ () => setRoom(roomNo + 1) }>Next ►</Button> }
    </React.Fragment>
  );
}