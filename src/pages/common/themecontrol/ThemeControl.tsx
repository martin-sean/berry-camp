import React from 'react';
import { IconButton } from '@material-ui/core';
import { Brightness4 as DarkIcon, BrightnessHigh as LightIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import { toggleDarkTheme } from 'redux/actions';

export default () => {
  const dark = useSelector((store: GlobalStore) => store.dark);
  const dispatch = useDispatch();

  // Dispatch a redux action to toggle the theme
  const handleThemeToggle = () => {
    dispatch(toggleDarkTheme());
  }

  return (
    <IconButton onClick={ handleThemeToggle } style={{ color: 'white' }}>
      { dark ? <DarkIcon/> : <LightIcon/> }
    </IconButton>
  );
}