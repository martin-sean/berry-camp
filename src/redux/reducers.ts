import { SET_DATA, SET_NAV, CLEAR_NAV } from './actionTypes';
import { Actions } from "./actions";

// Chapter navigation tree data
import { DataTree } from 'api/Data';

// Represents a position in the drawer navigation menu
export interface Navigation {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
}

export interface NavActionProps {
  chapterId?: string,
  sideNo?: string,
  checkpointNo?: string,
  roomNo?: string,
}

// Define the redux store
export interface GlobalStore {
  data: DataTree | null,
  nav: Navigation,
}

// Define the default structure of Navigation structure
export const defaultNav: Navigation = {
  chapterId: '',
  sideNo: '',
  checkpointNo: '',
  roomNo: '',
};

// Define the default state of the store
const defaultStore: GlobalStore = {
data: null,
  nav: defaultNav,
};

// Main redux reducer
export default (store: GlobalStore = defaultStore, action: Actions): GlobalStore => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...store,
        data: action.data,
      };

    case SET_NAV:
      return {
        ...store,
        nav: {
          ...defaultNav,
          ...action.nav,
        }
      };

    case CLEAR_NAV:
      return {
        ...store,
        nav: defaultNav,
      };
    
    default:
      return store;
  }

}