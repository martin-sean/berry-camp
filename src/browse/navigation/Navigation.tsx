import React, { useState, useEffect } from 'react';
import { Navigation, NavActionProps } from 'redux/reducers';
import { makeStyles, Paper, Grid, Typography, Fade, Button } from '@material-ui/core';
import { DataTree, Chapter, Side, Checkpoint } from 'api/Data';
import pluralize from 'utils/pluralize';
import { Skeleton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { SetNavAction, setNav } from 'redux/actions';
import Room from 'browse/navigation/room';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
  },
  chapterDesc: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chapterImage: {
    width: '100%',
  },
  loadingImageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.5%',
  },
  loadingImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    whiteSpace: 'nowrap',
  },
  navButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    height: '100%',
  }
}));

const prevText = '◄ Prev';
const nextText = 'Next ►';

interface NavigationProps {
  data: DataTree,
  nav: Navigation,
  setDocTitle: (title: string | undefined) => void,
}

const chapterImageUrl = 'https://f002.backblazeb2.com/file/berrycamp/static/navigation/chapters/images/';

export default (props: NavigationProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // TODO: Look an alternative to all these undefined checks

  // Get the selected chapter, side and checkpoint if they exist
  const chapter = props.nav.chapterId ? props.data[props.nav.chapterId] : undefined;
  const side = props.nav.sideNo ? chapter?.sides[props.nav.sideNo] : undefined;
  const checkpoint = props.nav.checkpointNo ? side?.checkpoints[props.nav.checkpointNo] : undefined;
  const room = props.nav.roomNo ? checkpoint?.rooms[props.nav.roomNo] : undefined;

  const [chapterLoaded, setChapterLoaded] = useState(false);

  // Check for previous and next chapters
  const chapterId = props.nav.chapterId;
  const chapterKeys = Object.keys(props.data);
  const prevChapterId = chapterId ? chapterKeys[chapterKeys.indexOf(chapterId) - 1] : undefined;
  const prevChapter = prevChapterId ? props.data[prevChapterId] : undefined;
  const nextChapterId = chapterId ? chapterKeys[chapterKeys.indexOf(chapterId) + 1] : undefined;
  const nextChapter = nextChapterId ? props.data[nextChapterId] : undefined;

  // Check for previous and next sides
  const sideNo = props.nav.sideNo ? parseInt(props.nav.sideNo) : undefined;
  const prevSideNo = sideNo ? sideNo - 1 : undefined;
  const prevSide = prevSideNo ? chapter?.sides[prevSideNo] : undefined;
  const nextSideNo = sideNo? sideNo + 1 : undefined;
  const nextSide = nextSideNo ? chapter?.sides[nextSideNo] : undefined;

  // Check for previous and next checkpoints
  const checkpointNo = props.nav.checkpointNo ? parseInt(props.nav.checkpointNo) : undefined;
  const prevCheckpointNo = checkpointNo ? checkpointNo - 1 : undefined;
  const prevCheckpoint = prevCheckpointNo ? side?.checkpoints[prevCheckpointNo] : undefined;
  const nextCheckpointNo = checkpointNo ? checkpointNo + 1 : undefined;
  const nextCheckpoint = nextCheckpointNo ? side?.checkpoints[nextCheckpointNo] : undefined;

  const setNavigation = (nav: NavActionProps) => {
    dispatch<SetNavAction>(setNav(nav));
  }

  // Reload chapter image on chapter change
  useEffect(() => {
    setChapterLoaded(false);
  }, [props.nav.chapterId, setChapterLoaded]);

  // Navigation buttons
  interface NavButtonsProps {
    prev: boolean,
    next: boolean,
    prevNav: NavActionProps,
    nextNav: NavActionProps,
  }
  
  // Navigation buttons
  const NavButtons = (props: NavButtonsProps) => {
    return (
      <Grid container spacing={ 2 }>
        <Grid item xs={ 6 }>
          <Button disabled={ !props.prev } variant='outlined' className={ classes.button } onClick={ () => setNavigation(props.prevNav) }>{ prevText }</Button>
        </Grid>
        <Grid item xs={ 6 }>
          <Button disabled={ !props.next } variant='outlined' className={ classes.button } onClick={ () => setNavigation(props.nextNav) }>{ nextText }</Button>
        </Grid>
      </Grid>
    );
  }

  const ChapterView = (chapter: Chapter) => (
    // Weirdly does not evalute to true on it's own so !! is required
    <Fade in={ !!chapter }>
      <Paper className={ classes.paper }>
        {/* Heading / Navigation buttons inner grid */}
        <Grid container spacing={ 3 }>
          {/* Heading and side count */}
          <Grid item xs={ 12 } sm={ 6 }>
            <Typography variant='h5'>
              { chapter.chapter_no ? `Chapter ${ chapter.chapter_no}: ${ chapter.name }` : chapter.name }
            </Typography>
            <Typography color='textSecondary'>{ pluralize(Object.keys(chapter.sides).length, 'side') }</Typography>
          </Grid>
          {/* Navigation buttons */}
          <Grid item xs={ 12 } sm={ 6 } className={ classes.navButtonContainer }>
            <NavButtons
              prev={ !!prevChapter }
              next={ !!nextChapter }
              prevNav={ prevChapterId ? { chapterId: prevChapterId.toString() } : {} }
              nextNav={ nextChapterId ? { chapterId: nextChapterId.toString() } : {} }
            />
          </Grid>
        </Grid> 
        {/* description */}
        <Typography className={ classes.chapterDesc } color='textSecondary'>{ chapter.desc }</Typography>
        {/* Render a placeholder while the chapter image loads */}
        { !chapterLoaded && (
          <div className={ classes.loadingImageContainer }>
            <Skeleton className={ classes.loadingImage } variant='rect' />
          </div>
        )}
        <Fade in={ chapterLoaded }>
          <img
            src={ `${ chapterImageUrl }${ props.nav.chapterId }.png` }
            className={ classes.chapterImage }
            onLoad={ () => setChapterLoaded(true) }
            style={ chapterLoaded ? {} : { display: 'none' } }
            alt='Celeste chapter select screen showing the chapter positioned on a 3D mountain'
          />
        </Fade>
      </Paper>
    </Fade>
  );

  const SideView = (side: Side) => (
    <Fade in={ !!side }>
      <Paper className={ classes.paper }>
        <Grid container spacing={ 2 }>
          {/* Content */}
          <Grid item xs={ 12 } sm={ 6 }>
            <Typography variant='h5'>{ `${ side.name } side` }</Typography>
            <Typography color='textSecondary'>{ pluralize(Object.keys(side.checkpoints).length, 'checkpoint') }</Typography>
          </Grid>
          {/* Navigation buttons */}
          <Grid item xs={ 12 } sm={ 6 } className={ classes.navButtonContainer }>
            <NavButtons
              prev={ !!prevSide }
              next={ !!nextSide }
              prevNav={ prevSideNo ? { chapterId: chapterId, sideNo: prevSideNo.toString() } : { } }
              nextNav={ nextSideNo ? { chapterId: chapterId, sideNo: nextSideNo.toString() } : { } }
            />
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );

  const CheckpointView = (checkpoint: Checkpoint) => (
    <Fade in={ !!checkpoint }>
      <Paper className={ classes.paper }>
        <Grid container spacing={ 2 }>
          {/* Content */}
          <Grid item xs={ 12 } sm={ 6 }>
            <Typography variant='h5'>{ `${ checkpoint.name } (${ checkpoint.abbreviation })` }</Typography>
            <Typography color='textSecondary'>{ pluralize(Object.keys(checkpoint.rooms).length, 'room') }</Typography>
          </Grid>
          {/* Navigation buttons */}
          <Grid item xs={ 12 } sm={ 6 } className={ classes.navButtonContainer }>
            <NavButtons
              prev={ !!prevCheckpoint }
              next={ !!nextCheckpoint }
              prevNav={ prevCheckpointNo ? { chapterId: chapterId, sideNo: sideNo?.toString(), checkpointNo: prevCheckpointNo.toString() } : { } }
              nextNav={ nextCheckpointNo ? { chapterId: chapterId, sideNo: sideNo?.toString(), checkpointNo: nextCheckpointNo.toString() } : { } }
            />
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );

  // Main Navigation Body
  return (
    <React.Fragment>
      <Grid container spacing={ 3 }>
        {/* Left Side */}
        <Grid item xs={ 12 } lg={ 5 }>
          {/* If the room is present render it */}
          { room ? (
            <Grid item>
              <Fade in={ !!room }>
                <Paper className={ classes.paper }>
                  <Room
                    data={ props.data }
                    nav={ props.nav }
                    setDocTitle={ props.setDocTitle }
                  />
                </Paper>
              </Fade>
            </Grid>
          ) : (
            // Inner column grid
            <Grid container spacing={ 3 } direction='column'>
              {/* Chapter */}
              { chapter && (
                <Grid item>
                  { ChapterView(chapter) }
                </Grid>
              )}
              {/* Side */}
              { side && (
                <Grid item>
                  { SideView(side) }
                </Grid>
              )}
              {/* Checkpoint */}
              { checkpoint && (
                <Grid item>
                  { CheckpointView(checkpoint) }
                </Grid>
              )}
            </Grid>
            // End of inner grid
          )}
        </Grid>

        {/* Right Side */}
        <Grid item xs={ 12 } lg={ 7 }>
          {/* TODO: Placeholder */}
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
          <Skeleton animation={ false } height={ 50 }/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}