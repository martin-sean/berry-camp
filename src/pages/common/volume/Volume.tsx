import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import { IconButton, Slider, makeStyles } from '@material-ui/core';
import { VolumeUp as VolumeUpIcon, VolumeOff as VolumnDownIcon } from '@material-ui/icons';
import { setVolume } from 'redux/actions';

const useStyles = makeStyles(theme => ({
  slider: {
    width: 75,
    marginRight: theme.spacing(2),
  },
  popup: {
    padding: theme.spacing(2),
    height: 150,
    top: '-100%',
  }
}));

/**
 * Clip volume control
 */
export default () => {
  const classes = useStyles();
  const volume = useSelector((store: GlobalStore) => store.volume);
  
  const dispatch = useDispatch();

  // Set the volume when the user stops dragging
  const handleSliderChange = (event: React.ChangeEvent<any>, value: number | number[]) => {
    dispatch(setVolume(value as number));
  }

  // Mute/Mate
  const handleVolumeToggle = () => {
    dispatch(setVolume(volume ? 0 : 100));
  }

  // User leaves the icon
  return (
    <React.Fragment>
      <IconButton onClick={ handleVolumeToggle }>
        <React.Fragment>
          { volume === 0 ? <VolumnDownIcon/> : <VolumeUpIcon/> }
        </React.Fragment>
      </IconButton>
      <Slider
        className={ classes.slider }
        value={ volume }
        defaultValue={ volume }
        step={ 10 }
        min={ 0 }
        max={ 100 } 
        onChange={ handleSliderChange }
      />
    </React.Fragment>
  );
}