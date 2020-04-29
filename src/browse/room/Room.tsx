import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles, Fade, Theme, Typography, Divider } from '@material-ui/core'
import { DataTree } from '../../api/Data';
import { useParams } from 'react-router-dom';

const imageHost = 'https://f002.backblazeb2.com/file/strawberry-house/small/'

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    objectFit: 'cover',
    maxWidth: '100%',
    height: '300px',
  },
  imageWrapper: {
    marginBottom: '20px',
  },
  info: {
    fontSize: '12pt',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
}));

export default (props: { data: DataTree, setTitle: (title: string | undefined) => void }) => {
  const [loaded, setLoaded] = useState(false);
  const { chapterId, sideNo, checkpointNo, roomNo } = useParams();
  const classes = useStyles();

  if (!(chapterId && sideNo && checkpointNo && roomNo)) {
    return (
      <div>Error loading room </div>
    );
  }

  const chapter = props.data[chapterId];
  const side = chapter?.sides[sideNo];
  const checkpoint = side?.checkpoints[checkpointNo];
  const room = checkpoint?.rooms[roomNo];

  props.setTitle(room.name);

  const image = imageHost + chapterId + '/' + sideNo + '/' + checkpointNo + '/' + roomNo + '.jpg'

  useEffect(() => {
    setLoaded(false);
  }, [roomNo]);

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

      <Typography variant="h4" color="textPrimary">{ room.name }</Typography>
      <Typography variant="h6" color="textSecondary">Room: { checkpoint.abbreviation + '-' + roomNo }</Typography>
      <Typography variant="h6" color="textSecondary">Debug: { room.debug_id }</Typography>
      <Divider className={ classes.divider } />
      <Typography className={ classes.info } variant="h6" color="textSecondary">Chapter: { chapter.name }</Typography>
      <Typography className={ classes.info } variant="h6" color="textSecondary">Side: { side.name }</Typography>
      <Typography className={ classes.info } variant="h6" color="textSecondary">Checkpoint: { checkpoint.name }</Typography>
    </React.Fragment>
  )
}