import { SET_DATA, SET_NAV, CLEAR_NAV, SET_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN, CLEAR_NOTIFICATION, SET_NOTIFICATION, TOGGLE_DARK_THEME, SET_VOLUME } from './actionTypes';
import { DataTree } from 'api/chapterdata'
import { NavActionProps, Notification } from './reducers';

interface SetDataAction {
  type: typeof SET_DATA,
  data: DataTree,
}

interface SetNavAction {
  type: typeof SET_NAV,
  nav: NavActionProps,
}

// Clear navigation (and set and provided values)
interface ClearNavAction {
  type: typeof CLEAR_NAV,
}

interface SetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN,
  accessToken: string,
}

interface ClearAccessTokenAction {
  type: typeof CLEAR_ACCESS_TOKEN,
}

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION,
  notification: Notification,
}

interface ClearNotificationAction {
  type: typeof CLEAR_NOTIFICATION,
}

interface ToggleDarkThemeAction {
  type: typeof TOGGLE_DARK_THEME,
}

interface SetVolumeAction {
  type: typeof SET_VOLUME,
  volume: number,
}

// All redux actions
export type Actions = SetDataAction | 
  SetNavAction | 
  ClearNavAction | 
  SetAccessTokenAction | 
  ClearAccessTokenAction | 
  SetNotificationAction | 
  ClearNotificationAction |
  ToggleDarkThemeAction |
  SetVolumeAction;

// Actions
export const setData = (data: DataTree): SetDataAction => {
  return { type: SET_DATA, data };
}

export const setNav = (nav: NavActionProps): SetNavAction => {
  return { type: SET_NAV, nav };
}

export const clearNav = (): ClearNavAction => {
  return { type: CLEAR_NAV };
}

export const setAccessToken = (accessToken: string): SetAccessTokenAction => {
  return { type: SET_ACCESS_TOKEN, accessToken };
}

export const clearAccessToken = (): ClearAccessTokenAction => {
  return { type: CLEAR_ACCESS_TOKEN };
}

export const setNotification = (notification: Notification): SetNotificationAction => {
  return { type: SET_NOTIFICATION, notification };
}

export const clearNotification = (): ClearNotificationAction => {
  return { type: CLEAR_NOTIFICATION };
}

export const toggleDarkTheme = (): ToggleDarkThemeAction => {
  return { type: TOGGLE_DARK_THEME };
}

export const setVolume = (volume: number): SetVolumeAction => {
  return { type: SET_VOLUME, volume };
}