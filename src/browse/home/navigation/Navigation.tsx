import React from 'react';
import { Navigation } from '../../../redux/reducers';
import { makeStyles, Paper, Grid, Typography, Fade } from '@material-ui/core';
import { DataTree } from '../../../api/Data';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  leftSide: {
    
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
  },
  chapter: {

  },
  side: {
    
  },
  checkpoint: {

  },
}));

interface NavigationProps {
  data: DataTree,
  nav: Navigation,
}

export default (props: NavigationProps) => {
  const classes = useStyles();

  // Get the selected chapter, side and checkpoint if they exist
  const chapter = props.nav.chapterId ? props.data[props.nav.chapterId] : undefined;
  const side = props.nav.sideNo ? chapter?.sides[props.nav.sideNo] : undefined;
  const checkpoint = props.nav.checkpointNo ? side?.checkpoints[props.nav.checkpointNo] : undefined;

  return (
    <React.Fragment>
      <Grid container spacing={ 3 }>
        {/* Left Side */}
        <Grid item xs={ 12 } lg={ 7 } className={ classes.leftSide }>
          { chapter && (
            // Weirdly does not evalute to true on it's own so !! is required
            <Fade in={ !!chapter }>
              <Paper className={ classes.paper }>
                <Typography variant='h5'>
                  { chapter.chapter_no ? `Chapter: ${ chapter.chapter_no} - ${ chapter.name }` : chapter.name }
                </Typography>
                <Typography color='textSecondary'>{ `${ Object.keys(chapter.sides).length } sides` }</Typography>
              </Paper>
            </Fade>
          )}
        </Grid>
        {/* Right Side */}
        <Grid item xs={ 12 } lg={ 5 } className={ classes.rightSide }>
          {/* Inner column grid */}
          <Grid container spacing={ 3 } direction='column'>
            <Grid item className={ classes.side }>
              { side && (
                <Fade in={ !!side }>
                  <Paper className={ classes.paper }>
                    <Typography variant='h5'>{ `${ side.name } side` }</Typography>
                    <Typography color='textSecondary'>{ `${ Object.keys(side.checkpoints).length } checkpoints` }</Typography>
                  </Paper>
                </Fade>
              )}
            </Grid>
            <Grid item className={ classes.checkpoint }>
              { checkpoint && (
                <Fade in={ !!checkpoint }>
                  <Paper className={ classes.paper }>
                    <Typography variant='h5'>{ `${ checkpoint.name } (${ checkpoint.abbreviation })` }</Typography>
                    <Typography color='textSecondary'>{ `${ Object.keys(checkpoint.rooms).length } rooms` }</Typography>
                  </Paper>
                </Fade>
              )}
            </Grid>
          </Grid>
          {/* End of inner grid */}
        </Grid>
      </Grid>
      
    </React.Fragment>
  );
}

// { nav && nav.checkpointNo && nav.sideNo && nav.chapterId ?
//   <RoomList data={ data } chapterId={ nav.chapterId } sideNo={ nav.sideNo } checkpointNo={ nav.checkpointNo } closeDrawer={ props.closeDrawer }/>
// : nav && nav.sideNo && nav.chapterId ?
//   <CheckpointList data={ data } chapterId={ nav.chapterId } sideNo={ nav.sideNo }/>
// : nav && nav.chapterId ?
//   <SideList data={ data } chapterId={ nav.chapterId }/>
// :
//   <ChapterList data={ data }/>
// }