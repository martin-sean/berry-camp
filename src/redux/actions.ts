import { SET_DATA, SET_NAV, CLEAR_NAV, SET_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN } from './actionTypes';
import { DataTree } from 'api/Data'
import { NavActionProps } from './reducers';

export interface SetDataAction {
  type: typeof SET_DATA;
  data: DataTree;
}

export interface SetNavAction {
  type: typeof SET_NAV;
  nav: NavActionProps;
}

// Clear navigation (and set and provided values)
export interface ClearNavAction {
  type: typeof CLEAR_NAV;
}

export interface SetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  accessToken: string,
}

export interface ClearAccessTokenAction {
  type: typeof CLEAR_ACCESS_TOKEN;
}

export type Actions = SetDataAction | SetNavAction | ClearNavAction | SetAccessTokenAction | ClearAccessTokenAction;

// Actions

export const setData = (data: DataTree): SetDataAction => {
  return { type: SET_DATA, data: data };
}

export const setNav = (nav: NavActionProps): SetNavAction => {
  return { type: SET_NAV, nav: nav };
}

export const clearNav = (): ClearNavAction => {
  return { type: CLEAR_NAV };
}

export const setAccessToken = (accessToken: string): SetAccessTokenAction => {
  return { type: SET_ACCESS_TOKEN, accessToken: accessToken };
}

export const clearAccessToken = (): ClearAccessTokenAction => {
  return { type: CLEAR_ACCESS_TOKEN };
}