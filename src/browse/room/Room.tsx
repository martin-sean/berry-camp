import React, { useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { DataTree } from '../../api/Data';
import { useParams } from 'react-router-dom';

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
}));

export default (props: { data: DataTree }) => {
  const [loaded, setLoaded] = useState(false);
  const { chapterId, sideNo, checkpointNo, roomNo } = useParams();
  const classes = useStyles();
  
  if (!(chapterId && sideNo && checkpointNo && roomNo)) {
    return (
        <div>Error loading room </div>
    );
  }

  const room = props.data[chapterId]?.sides[sideNo]?.checkpoints[checkpointNo]?.rooms[roomNo];

  return (
    <React.Fragment>
      {
          loaded ? null : <Skeleton className={ classes.placeholder } />
      }
      <img
        className={ classes.image }
        src="https://f002.backblazeb2.com/file/strawberry-house/screens/1/a/0001.jpg"
        style={ loaded ? {} : { display: 'none'} }
        onLoad={ () => setLoaded(true) }
      />
      <Typography variant="h4" color="textPrimary">{ room.name }</Typography>
      <Typography variant="h6" color="textSecondary">Debug id: { room.debug_id }</Typography>
    </React.Fragment>
  )
}