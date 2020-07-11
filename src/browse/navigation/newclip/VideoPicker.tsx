import React, { useState, useEffect, useCallback } from 'react';
import YouTube from 'react-youtube';
import { Slider, makeStyles, Box, Typography } from '@material-ui/core';
import commonStyles from 'utils/common-styles';
import { formatSeconds } from 'utils/clip-time';
import { useSelector } from 'react-redux';
import { GlobalStore } from 'redux/reducers';

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface VideoPickerProps {
  videoId: string,
  startTime?: number,
  endTime?: number,
  setTimes: (startTime: number, endTime: number) => void,
}

export default (props: VideoPickerProps) => {
  const classes = useStyles();

  // Set the default selected clip times
  const defaultStartTime = props.startTime || 0;
  const defaultEndTime = props.endTime || defaultStartTime + 20;

  // Remember the duration of the video
  const [duration, setDuration] = useState<number>();
  const [startTime, setStartTime] = useState<number>(defaultStartTime);
  const [endTime, setEndTime] = useState<number>(defaultEndTime);
  const [player, setPlayer] = useState<YT.Player>();
  const [marks, setMarks] = useState<number[]>([]);

  // Current volume
  const volume = useSelector((store: GlobalStore) => store.volume);

  // Set the new range values
  const handleTimesChange = (event: any, newValue: number | number[]) => {
    const times = newValue as number[];
    setStartTime(times[0]);
    setEndTime(times[1]);
  }

  // Update the slider range marks
  const updateRange = useCallback((duration: number) => {
    const spacer = Math.max((endTime - startTime) / 2, 5);
    const intervalNo = 30;
    // Calculate and round the range
    let startRange = Math.floor((startTime - spacer) / intervalNo) * intervalNo
    let endRange = Math.ceil((endTime + spacer) / intervalNo) * intervalNo
    // Limit the range from 0 to duration
    startRange = startRange > 0 ? startRange : 0;
    endRange = endRange < duration ? endRange : duration;

    // Set the slider marks
    setMarks([startRange, endRange]);
  }, [startTime, endTime])

  // Set the length of the video
  const handleReady = (event: { target: YT.Player }) => {
    // Recalculate the range with the default values
    const duration = event.target.getDuration();
    // Break if not actually ready (wrong video ID provided)
    if (!duration) return;
    
    setDuration(duration);
    setPlayer(event.target);

    // If a start/end time is provided when editing, set them OR
    // If a new clip and a start time is provided, set the default range of 20seconds
    if (props.endTime || startTime !== 0) {
      updateRange(duration);
      props.setTimes(startTime, endTime);
    // Use full range otherwise
    } else {
      setEndTime(duration);
      setMarks([0, duration]);
      props.setTimes(0, duration);
    }
  }

  // Set the props in the parent
  const handleCommited = () => {
    duration && updateRange(duration);
    props.setTimes(startTime, endTime);
  }
  
  // Set the volume on change
  useEffect(() => {
    if (!player) return;
    volume === 0 ? player.mute() : player.unMute();
    player.setVolume(volume);
  }, [volume, player])

  // Restart the youtube video when time update
  useEffect(() => {
    player && player.seekTo(startTime, true);
  }, [player, startTime])

  useEffect(() => {
    player && player.seekTo(endTime, true);
  }, [player, endTime])

  // Set a timer to loop the youtube video
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player) {
      interval = setInterval(() => {
        if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
          const currentTime = player.getCurrentTime();
          if (currentTime > endTime || currentTime < startTime ) {
            player.seekTo(startTime, true);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [player, startTime, endTime])

  return (
    <div className={ classes.wrapper }>
      <div className={ classes.aspectBox }>
        <YouTube
          className={ classes.aspectContent }
          videoId={ props.videoId }
          onReady={ handleReady }
          opts={{
            playerVars: {
              start: props.startTime || 0,
              mute: 1,
              controls: 0,
              autoplay: 1,
              loop: 1,
              playlist: props.videoId,
              enablejsapi: 1,
              showinfo: 0,
              fs: 1,
            }}
          }
        />
      </div>
      {/* Render slider when player is ready */}
      { player && marks.length > 0 && (
        <React.Fragment>
          <Slider
            value={ [startTime, endTime] }
            valueLabelDisplay='on'
            min={ marks[0] }
            max={ marks[1] }
            valueLabelFormat={ formatSeconds }
            onChange={ handleTimesChange }
            onChangeCommitted={ handleCommited }
          />
          <Box style={{ width: '100%' }} display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography>{ formatSeconds(marks[0]) }</Typography>
            <Typography>{ formatSeconds(marks[1]) }</Typography>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
}