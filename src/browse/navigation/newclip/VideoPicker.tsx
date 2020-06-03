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

  // Remember the length of the video
  const [startTime, setStartTime] = useState<number>(defaultStartTime);
  const [endTime, setEndTime] = useState<number>(defaultEndTime);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [marks, setMarks] = useState<Mark[]>([]);

  // Set the new range values
  const handleTimesChange = (event: any, newValue: number | number[]) => {
    if ((newValue as number[])[1]) {
      setStartTime((newValue as number[])[0]);
      setEndTime((newValue as number[])[1]);
    }
  }

  const updateRange = useCallback((duration: number) => {
    const spacer = endTime - startTime;
    const startSpacer = startTime ? (startTime - spacer) : 0;
    const rangeStart = startSpacer > 0 ? startSpacer : 0; // Set to 0 if negative
    const endSpacer = endTime + spacer;
    const rangeEnd = duration ? (endSpacer < duration ? endSpacer : duration) : 100;

    // Set the slider marks
    setMarks([
      { value: rangeStart, label: secondsToString(rangeStart) },
      { value: rangeEnd, label: secondsToString(rangeEnd) }
    ]);
  }, [startTime, endTime])

  const secondsToString = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${ minutes ? `${ minutes }m` : '' }${ seconds.toString().padStart(2, '0')}s`;
  }

  // Set the length of the video
  const handleReady = (event: { target: YT.Player }) => {
    // Recalculate the range with the default values
    const duration = event.target.getDuration();
    setPlayer(event.target);
    event.target.getIframe().focus();
    // If start time provided, set the range
    if (startTime !== 0) {
      updateRange(duration);
    // Default otherwise
    } else {
      startTime === 0 && setEndTime(duration);
      setMarks([
        { value: startTime, label: secondsToString(startTime) },
        { value: duration, label: secondsToString(duration) }
      ]);
    }
  }

  // Set the props in the parent
  const handleCommited = () => {
    console.log(`SET ${ startTime } ${ endTime }`);
    player && updateRange(player.getDuration());
    props.setTimes(startTime, endTime);
  }
  
  // Restart the youtube video on start time update
  useEffect(() => {
    if (player) {
      player.seekTo(startTime, true);
    }
  }, [startTime, player])

   // Restart the youtube video on end time update
   useEffect(() => {
    if (player) {
      player.seekTo(endTime, true);
    }
  }, [endTime, player])

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