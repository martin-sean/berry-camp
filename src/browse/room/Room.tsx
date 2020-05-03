import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles, Fade, Theme, Typography, Divider } from '@material-ui/core'
import { DataTree } from '../../api/Data';
import { LastRoom } from '../../App';

const imageHost = 'https://cdn.berrycamp.com/file/strawberry-house/screens/'

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    imageRendering: 'pixelated',
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '360px',
  },
  imageWrapper: {
    paddingBottom: theme.spacing(1),
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
  lastRoom: LastRoom,
  data: DataTree,
  setTitle: (title: string | undefined) => void
}

export default React.memo((props: RoomProps) => {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  
  const chapter = props.data[props.lastRoom.chapterId];
  const side = chapter?.sides[props.lastRoom.sideNo];
  const checkpoint = side?.checkpoints[props.lastRoom.checkpointNo];
  const room = checkpoint?.rooms[props.lastRoom.roomNo];

  props.setTitle(room?.name);

  const image = imageHost + props.lastRoom.chapterId + 
    '/' + props.lastRoom.sideNo +
    '/' + props.lastRoom.checkpointNo +
    '/' + props.lastRoom.roomNo + 
    '.png'

  const errorImage = '/img/error.jpg';

  useEffect(() => {
    setLoaded(false);
  }, [props.lastRoom]);

  return (
    <React.Fragment>
      <div className={ classes.imageWrapper }>
        <Fade in={ !loaded }>
          <div>
          {
              loaded ? null : 
              <React.Fragment>
                <Skeleton variant="rect" width={ '100%' } height={360} />
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
            onError={ (e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = errorImage
            } }
          />
        </Fade>
      </div>

      {
        room ?
          <React.Fragment>
            <Typography variant="h5" color="textPrimary">{ room?.name }</Typography>
            <Typography className={ classes.info } color="textSecondary">{ chapter.chapter_no && `Chapter ${ chapter.chapter_no }: `}{ chapter?.name }</Typography>
            <Typography className={ classes.info } color="textSecondary">{ side?.name } Side</Typography>
            <Typography className={ classes.info } color="textSecondary">{ checkpoint?.name }</Typography>
            <Divider className={ classes.divider } />
            <Typography color="textSecondary">Room ID: { checkpoint?.abbreviation + '-' + props.lastRoom.roomNo }</Typography>
            <Typography color="textSecondary">Debug ID: { room?.debug_id }</Typography>
          </React.Fragment>
        :
          <React.Fragment>
            <Typography variant="h5" color="textPrimary">Room does not exist</Typography>
            <Typography color="textSecondary">Please select a room from the menu</Typography>
          </React.Fragment>
      }
    </React.Fragment>
  )
});