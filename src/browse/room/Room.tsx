import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles, Fade, Theme, Typography, Divider } from '@material-ui/core'
import { DataTree } from '../../api/Data';

const imageHost = 'https://f002.backblazeb2.com/file/strawberry-house/small/'

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    objectFit: 'cover',
    maxWidth: '100%',
    height: '300px',
  },
  imageWrapper: {
    display: 'inline',
    // marginBottom: '20px',
  },
  info: {
    fontSize: '12pt',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
}));

interface RoomProps { 
  chapterId: string, 
  sideNo: string, 
  checkpointNo: string, 
  roomNo: string, 
  data: DataTree,
  setTitle: (title: string | undefined) => void
}

export default (props: RoomProps) => {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  
  const chapter = props.data[props.chapterId];
  const side = chapter?.sides[props.sideNo];
  const checkpoint = side?.checkpoints[props.checkpointNo];
  const room = checkpoint?.rooms[props.roomNo];

  props.setTitle(room?.name);

  const image = imageHost + props.chapterId + '/' + props.sideNo + '/' + props.checkpointNo + '/' + props.roomNo + '.jpg'

  useEffect(() => {
    setLoaded(false);
  }, [props.roomNo]);

  return (
    <React.Fragment>
      <div className={ classes.imageWrapper }>
        <Fade in={ !loaded }>
          <div>
          {
              loaded ? null : 
              <React.Fragment>
                <Skeleton variant="rect" width={ '100%' } height={300} />
              </React.Fragment>
          }
          </div>
        </Fade>
        
        <Fade in={ loaded }>
          <img
            className={ classes.image }
            src={ image }
            alt="Screenshot of current room"
            style={ loaded ? {} : { display: 'none'} }
            onLoad={ () => setLoaded(true) }
          />
        </Fade>
      </div>

      <Typography variant="h4" color="textPrimary">{ room?.name }</Typography>
      <Typography variant="h6" color="textSecondary">Room: { checkpoint?.abbreviation + '-' + props.roomNo }</Typography>
      <Typography variant="h6" color="textSecondary">Debug: { room?.debug_id }</Typography>
      <Divider className={ classes.divider } />
      <Typography className={ classes.info } variant="h6" color="textSecondary">Chapter: { chapter?.name }</Typography>
      <Typography className={ classes.info } variant="h6" color="textSecondary">Side: { side?.name }</Typography>
      <Typography className={ classes.info } variant="h6" color="textSecondary">Checkpoint: { checkpoint?.name }</Typography>
    </React.Fragment>
  )
}