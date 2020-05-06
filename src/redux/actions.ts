import { SET_DATA, SET_ROOM, CLEAR_ROOM, SET_NAV, CLEAR_NAV } from './actionTypes';
import { DataTree } from "../api/Data";
import { Navigation, defaultNav, LastRoom } from './reducers';

export interface SetDataAction {
  type: typeof SET_DATA,
  data: DataTree,
}

export interface SetRoomAction {
  type: typeof SET_ROOM,
  room: LastRoom,
}

export interface ClearRoomAction {
  type: typeof CLEAR_ROOM,
}

export interface SetNavAction {
  type: typeof SET_NAV,
  nav: Navigation;
}

// Clear navigation (and set and provided values)
export interface ClearNavAction {
  type: typeof CLEAR_NAV,
  nav?: Navigation;
}

export type Actions = SetDataAction | SetRoomAction | ClearRoomAction | SetNavAction | ClearNavAction;

// Actions

export const setData = (data: DataTree): SetDataAction => {
  return { type: SET_DATA, data: data };
}

export const setRoom = (room: LastRoom): SetRoomAction => {
  return { type: SET_ROOM, room: room };
}

export const clearRoom = (): ClearRoomAction => {
  return { type: CLEAR_ROOM };
}

export const setNav = (nav: Navigation): SetNavAction => {
  return { type: SET_NAV, nav: nav };
}

export const clearNav = (nav?: Navigation) => {
  return { type: CLEAR_NAV, nav: nav };
}