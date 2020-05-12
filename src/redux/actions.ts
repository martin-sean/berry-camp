import { SET_DATA, SET_NAV, CLEAR_NAV } from './actionTypes';
import { DataTree } from 'api/Data'
import { NavActionProps } from './reducers';

export interface SetDataAction {
  type: typeof SET_DATA,
  data: DataTree,
}

export interface SetNavAction {
  type: typeof SET_NAV,
  nav: NavActionProps;
}

// Clear navigation (and set and provided values)
export interface ClearNavAction {
  type: typeof CLEAR_NAV,
}

export type Actions = SetDataAction | SetNavAction | ClearNavAction;

// Actions

export const setData = (data: DataTree): SetDataAction => {
  return { type: SET_DATA, data: data };
}

export const setNav = (nav: NavActionProps): SetNavAction => {
  return { type: SET_NAV, nav: nav };
}

export const clearNav = () => {
  return { type: CLEAR_NAV };
}