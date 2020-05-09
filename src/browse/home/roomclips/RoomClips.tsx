import React from 'react';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import Nav from './roomnav';
import Room from './room';
import { Skeleton } from '@material-ui/lab';
import { GlobalStore } from '../../../redux/reducers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

interface RoomClipsProps {
  setDocTitle: (title: string | undefined) => void,
}

// Container for displaying room and clip information when room is set in state
export default (props: RoomClipsProps) => {
  const classes = useStyles();
  const data = useSelector((store: GlobalStore) => store.data);
  const currentRoom = useSelector((store: GlobalStore) => store.room);
  
  // If data is not loaded
  if (!data) {
    return (
      <Paper className={ classes.paper }>
        <Typography variant='h4'>Data is not loaded</Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3} direction='row-reverse'>
      <Grid item xs={12} lg={5}>
        {
          currentRoom &&
          <React.Fragment>
            <Paper className={ classes.paper }>
              <Room
                data={ data }
                chapterId={ currentRoom.chapterId }
                sideNo={ currentRoom.sideNo }
                checkpointNo={ currentRoom.checkpointNo }
                roomNo={ currentRoom.roomNo }
                setDocTitle={ props.setDocTitle }
              />
            </Paper>
            {/* Room navigation buttons */}
            <Nav data={ data }/>
          </React.Fragment>
        }
      </Grid>
      <Grid item xs={12} lg={7}>
        {
          currentRoom &&
          <React.Fragment>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
          </React.Fragment>
        }
      </Grid>
    </Grid>
  );
}