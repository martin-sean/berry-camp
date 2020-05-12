import React from 'react';
import { Grid, Paper, makeStyles, Fade } from '@material-ui/core';
import Nav from './roomnav';
import Room from './room';
import { Skeleton } from '@material-ui/lab';
import { DataTree } from 'api/Data';
import { Navigation } from 'redux/reducers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

interface RoomClipsProps {
  data: DataTree,
  nav: Navigation,
  setDocTitle: (title: string | undefined) => void,
}

// Container for displaying room and clip information when room is set in state
export default (props: RoomClipsProps) => {
  const classes = useStyles();

  return (
    <Fade in={ true }>
      <Grid container spacing={ 3 } direction='row-reverse'>
        <Grid item xs={ 12 } lg={ 5 }>
          <Paper className={ classes.paper }>
            <Room
              data={ props.data }
              nav={ props.nav }
              setDocTitle={ props.setDocTitle }
            />
          </Paper>
          {/* Room navigation buttons */}
          <Nav data={ props.data } nav={ props.nav }/>
        </Grid>
        <Grid item xs={ 12 } lg= {7 }>
          <React.Fragment>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
            <Skeleton animation={false} height={ 50 }/>
          </React.Fragment>
        </Grid>
      </Grid>
    </Fade>
  );
}