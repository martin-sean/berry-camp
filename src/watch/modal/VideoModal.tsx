import React from 'react';
import YoutubePlayer from '../video';

export default () => {
  return(
    <React.Fragment> 
      <YoutubePlayer videoId="q7HsVafp0ps" start={738} end={756} mute={ 1 } />
    </React.Fragment>
  );
}