import React from 'react';

import Youtube, { Options } from 'react-youtube';

export default (props: { videoId: string, start: number, end: number, mute: 0 | 1 }) => {
  const opts: Options = {
    playerVars: {
      start: props.start,
      mute: props.mute,
      controls: 0,
      autoplay: 1,
      loop: 1,
      playlist: props.videoId,
      enablejsapi: 1,
      showinfo: 0,
      fs: 1,
    },
  }

  // Loop the clip from the start to end time
  const reloadVideo = (event: { target: YT.Player, data: YT.PlayerState }) => {
    let interval;
    switch(event.data) {
      // Start checking for the video to finish
      case Youtube.PlayerState.PLAYING:
        interval = setInterval(() => checkVideoEnded(event.target), 1000);
        break;
      // Stop checking while paused  
      case Youtube.PlayerState.PAUSED:
      case Youtube.PlayerState.ENDED:
        clearInterval(interval);
        break;
    }
  }

  // If the video has ended, navigate to the start (sanity check for start time too)
  const checkVideoEnded = (target: YT.Player) => {
    const currentTime = target.getCurrentTime();
    if (currentTime > props.end || currentTime < props.start) {
      target.seekTo(props.start, true);
    }
  }

  return (
    <Youtube
      videoId={ props.videoId }
      opts={ opts }
      onStateChange={ reloadVideo }
    />
  );
}