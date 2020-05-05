import { SET_DATA, SET_ROOM, CLEAR_ROOM, SET_NAV, CLEAR_NAV } from './actionTypes';
import { Actions } from "./actions";
import { DataTree } from '../api/Data';

// Chapter navigation tree data
import data from '../api/chapter-tree.json';

// Represents a position in the drawer navigation menu
export interface Navigation {
  chapterId: string | null,
  sideNo: string | null,
  checkpointNo: string | null,
}

// Represents the last room the user viewed
export interface LastRoom {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
}

// Define the redux store
export interface GlobalStore {
  data: DataTree,
  nav: Navigation,
  room: LastRoom | null;
}

// Define the default structure of Navigation structure
export const defaultNav = {
  chapterId: null,
  sideNo: null,
  checkpointNo: null,
};

// Define the default state of the store
const defaultState: GlobalStore = {
  data: data,
  nav: defaultNav,
  room: null,
};

// Main redux reducer
export default (state: GlobalStore = defaultState, action: Actions): GlobalStore => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
      
    case SET_ROOM:
      return {
        ...state,
        room: state.room,
      };

    case CLEAR_ROOM:
      return {
        ...state,
        room: null,
      };

    case SET_NAV:
      return {
        ...state,
        nav: action.nav,
      };

    case CLEAR_NAV:
      return {
        ...state,
        nav: defaultNav,
      };
    
    default:
      return state;
  }

}