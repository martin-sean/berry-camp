import React, { useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Theme, Typography, Divider } from '@material-ui/core'
import { DataTree } from '../../api/Data';
import { useParams } from 'react-router-dom';

const imageHost = 'https://f002.backblazeb2.com/file/strawberry-house/screens/'


const useStyles = makeStyles((theme: Theme) => ({
  placeholder: {
    transform: 'none',
    width: '100%',
    height: '300px',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '300px',
  },
  info: {
    fontSize: '12pt',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  }
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

  const imageUrl = imageHost
    + (chapter.chapter_no || chapter.name.toLocaleLowerCase()) 
    + '/' + side.name.toLocaleLowerCase() 
    + '/' + room.image + '.jpg'

  return (
    <React.Fragment>
      {
          loaded ? null : <Skeleton className={ classes.placeholder } />
      }
      <img
        className={ classes.image }
        src={ imageUrl }
        alt="Screenshot of current room"
        style={ loaded ? {} : { display: 'none'} }
        onLoad={ () => setLoaded(true) }
      />

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