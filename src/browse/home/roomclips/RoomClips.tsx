import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
// import Nav from './roomnav';
import Room from './room';
import { Skeleton } from '@material-ui/lab';
import { DataTree } from 'api/Data';
import { Navigation } from 'redux/reducers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  scrollable: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  column: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  columnInner: {
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    boxSizing: 'content-box',
  }
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
    <div className={ classes.row }>
      <div className={ classes.column }>
        <div className={ classes.columnInner }>
          <Paper className={ classes.paper }>
             <Room
               data={ props.data }
               nav={ props.nav }
               setDocTitle={ props.setDocTitle }
             />
           </Paper>
        </div>
      </div>
      <div className={ classes.column }>
        <div className={ classes.columnInner }>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
        </div>
      </div>
    </div>
    // <Fade in={ true }>
    //   <Grid container spacing={ 3 }>
    //     <Grid item xs={ 12 } lg={ 5 }>
    //       <Paper className={ classes.paper }>
    //         <Room
    //           data={ props.data }
    //           nav={ props.nav }
    //           setDocTitle={ props.setDocTitle }
    //         />
    //       </Paper>
    //       {/* Room navigation buttons */}
    //       <Nav data={ props.data } nav={ props.nav }/>
    //     </Grid>
    //     <Grid item xs={ 12 } lg= { 7 }>
    //       <div className={ classes.scrollable}>
    //         <Skeleton animation={ false } height={ 50 }/>
    //         <Skeleton animation={ false } height={ 50 }/>
    //         <Skeleton animation={ false } height={ 50 }/>
    //         <Skeleton animation={ false } height={ 50 }/>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </Fade>
  );
}