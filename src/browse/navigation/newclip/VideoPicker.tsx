import React, { useState, useEffect, useCallback } from 'react';
import Youtube from 'react-youtube';
import { Slider, makeStyles, Mark } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // Aspect ratio container
  playerContainer: {
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  slider: {
    width: '80%',
  },
}));

interface VideoPickerProps {
  videoId: string,
  startTime?: number,
  setTimes: (startTime: number, endTime: number) => void,
}

export default (props: VideoPickerProps) => {
  const classes = useStyles();
  // Set the default selected clip times
  const defaultStartTime = props.startTime || 0;
  const defaultEndTime = defaultStartTime + 20;

  // Remember the duration of the video
  const [duration, setDuration] = useState<number>();
  const [startTime, setStartTime] = useState<number>(defaultStartTime);
  const [endTime, setEndTime] = useState<number>(defaultEndTime);
  const [player, setPlayer] = useState<YT.Player>();
  const [marks, setMarks] = useState<Mark[]>([]);

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
    setMarks([
      { value: startRange, label: secondsToString(startRange) },
      { value: endRange, label: `${ secondsToString(endRange) } (${ secondsToString(duration)})` }
    ]);
  }, [startTime, endTime])

  const secondsToString = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${ minutes ? `${ minutes.toString().padStart(1, '0') }` : '00' }:${ seconds.toString().padStart(2, '0')}`;
  }

  // Set the length of the video
  const handleReady = (event: { target: YT.Player }) => {
    // Recalculate the range with the default values
    const duration = event.target.getDuration();
    // Break if not actually ready (wrong video ID provided)
    if (!duration) return;
    
    setDuration(duration);
    setPlayer(event.target);
    event.target.getIframe().focus();
    // If start time provided limit the range
    if (startTime !== 0) {
      updateRange(duration);
      props.setTimes(startTime, duration);
    // Use full range otherwise
    } else {
      setEndTime(duration);
      setMarks([
        { value: 0, label: secondsToString(startTime) },
        { value: duration, label: secondsToString(duration) }
      ]);
      props.setTimes(0, duration);
    }
  }

  // Set the props in the parent
  const handleCommited = () => {
    duration && updateRange(duration);
    props.setTimes(startTime, endTime);
  }
  
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
        if (player.getPlayerState() === Youtube.PlayerState.PLAYING) {
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
      <div className={ classes.playerContainer }>
        <Youtube
          className={ classes.player }
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
        <Slider
          className={ classes.slider }
          value={ [startTime, endTime] }
          valueLabelDisplay='on'
          min={ marks[0].value }
          max={ marks[1].value }
          marks={ marks }
          valueLabelFormat={ secondsToString }
          onChange={ handleTimesChange }
          onChangeCommitted={ handleCommited }
        />
      )} 
    </div>
  );
}