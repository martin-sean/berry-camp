import { SET_DATA, SET_ROOM, CLEAR_ROOM, SET_NAV, CLEAR_NAV } from './actionTypes';
import { DataTree, Room } from "../api/Data";
import { Navigation, LastRoom } from './reducers';

interface SetDataAction {
  type: typeof SET_DATA,
  data: DataTree,
}

interface SetRoomAction {
  type: typeof SET_ROOM,
  room: LastRoom,
}

interface ClearRoomAction {
  type: typeof CLEAR_ROOM,
}

interface SetNavAction {
  type: typeof SET_NAV,
  nav: Navigation;
}

interface ClearNavAction {
  type: typeof CLEAR_NAV,
}

export type Actions = SetDataAction | SetRoomAction | ClearRoomAction | SetNavAction | ClearNavAction;

export const setData = (data: DataTree) => {
  return { type: SET_DATA, data: data };
}

export const setRoom = (room: Room) => {
  return { type: SET_ROOM, ...room };
}

export const clearRoom = () => {
  return { type: CLEAR_ROOM };
}

export const setNav = (nav: Navigation) => {
  return { type: SET_NAV, ...nav };
}

export const clearNav = () => {
  return { type: CLEAR_NAV };
}