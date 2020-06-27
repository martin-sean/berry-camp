import { SET_DATA, SET_NAV, CLEAR_NAV, SET_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN, SET_NOTIFICATION, CLEAR_NOTIFICATION, TOGGLE_DARK_THEME, TOGGLE_MUTE } from './actionTypes';
import { Actions } from "./actions";

// Chapter navigation tree data
import { DataTree } from 'api/chapterdata';

// Represents a position in the drawer navigation menu
export interface Navigation {
  chapterId: string,
  sideNo: string,
  checkpointNo: string,
  roomNo: string,
}

// Notification message
export interface Notification {
  show: boolean,
  message: string,
  type: 'success' | 'info' | 'warning' | 'error',
  icon: 'none' | 'file',
  duration: number,
}

export interface NavActionProps {
  chapterId?: string,
  sideNo?: string,
  checkpointNo?: string,
  roomNo?: string,
}

// Define the redux store
export interface GlobalStore {
  data?: DataTree,
  nav: Navigation,
  notification: Notification,
  accessToken?: string,
  mute: boolean,
  dark: boolean,
}

// Define the default structure of Navigation structure
const defaultNav: Navigation = {
  chapterId: '',
  sideNo: '',
  checkpointNo: '',
  roomNo: '',
};

const defaultNotification: Notification = {
  show: false,
  message: '',
  type: 'info',
  icon: 'none',
  duration: 0,
}

// Define the default state of the store
const defaultStore: GlobalStore = {
  nav: defaultNav,
  notification: defaultNotification,
  mute: true,
  dark: true,
};

// Main redux reducer
export default (store: GlobalStore = defaultStore, action: Actions): GlobalStore => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...store,
        data: action.data,
      };
    }
    case SET_NAV: {
      return {
        ...store,
        nav: {
          ...defaultNav,
          ...action.nav,
        }
      };
    }
    case CLEAR_NAV: {
      return {
        ...store,
        nav: defaultNav,
      };
    }
    case SET_ACCESS_TOKEN: {
      return {
        ...store,
        accessToken: action.accessToken,
      };
    }
    case CLEAR_ACCESS_TOKEN: {
      return {
        ...store,
        accessToken: undefined,
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...store,
        notification: action.notification,
      }
    }
    case CLEAR_NOTIFICATION: {
      return {
        ...store,
        notification: {
          ...store.notification,
          show: false,
        }
      };
    }
    case TOGGLE_DARK_THEME: {
      return {
        ...store,
        dark: !store.dark
      };
    }
    case TOGGLE_MUTE: {
      return {
        ...store,
        mute: !store.mute
      };
    }
    default: {
      return store;
    }
  }

}