import React, { useState, useEffect, useCallback } from 'react';
import { Navigation, NavActionProps, GlobalStore } from 'redux/reducers';
import { Paper, Grid, Typography, Fade, Button, Fab, CircularProgress, List, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'; 
import { DataTree, Chapter, Side, Checkpoint } from 'api/chapterdata';
import pluralize from 'utils/pluralize';
import { useDispatch, useSelector } from 'react-redux';
import { setNav, setNotification } from 'redux/actions';
import Room from 'browse/navigation/room';
import { AddToQueue } from '@material-ui/icons';
import NewClip from './newclip';
import RoomNav from './roomnav';
import { getClips, ClipData, deleteClip } from 'api/clip';
import Clip from './clip/Clip';
import commonStyles from 'utils/common-styles';
import ClipItem from './clipitem';
import { getCurrentUser } from 'api/authenticate';


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
  },
  newClipButton: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  newClipIcon: {
    marginRight: theme.spacing(1),
  },
  centeredWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
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
  const commonClasses = commonStyles();

  const dispatch = useDispatch();

  // Check if logged in
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);
  const currentUser = getCurrentUser(accessToken);
  
  // Save clips from database
  // undefined = loading, [] = None found, null = error
  const [clips, setClips] = useState<ClipData[] | undefined | null>();

  // Chapter image loading
  const [chapterLoaded, setChapterLoaded] = useState(false);
  
  // Show the clip modal
  const [clip, setClip] = useState<ClipData>();

  // Remember a clip for editing/deletion when selected
  const [clipForEditing, setClipForEditing] = useState<ClipData>();
  // Show the clip edit modal
  const [editingClip, setEditingClip] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Get the selected chapter, side and checkpoint if they exist
  const chapterId = props.nav.chapterId;
  const chapter = chapterId ? props.data[chapterId] : undefined;
  const side = props.nav.sideNo ? chapter?.sides[props.nav.sideNo] : undefined;
  const checkpoint = props.nav.checkpointNo ? side?.checkpoints[props.nav.checkpointNo] : undefined;
  const room = props.nav.roomNo ? checkpoint?.rooms[props.nav.roomNo] : undefined;

  // Check for previous and next chapters
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

  const roomNo = props.nav.roomNo ? parseInt(props.nav.roomNo) : undefined;

  // Anchor the open menu
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // Set the open clip
  const setClipCallback = useCallback((clip?: ClipData) => {
    setClip(clip);
  }, [setClip]);

  // Callback to set the NewClip dialog open status
  const setEditClipCallback = useCallback(() => {
    setEditingClip(true);
  }, [setEditingClip]);

  // Callback to set the NewClip dialog open status
  const stopEditCallback = useCallback(() => {
    setClip(undefined);
    setEditingClip(false);
  }, [setClip, setEditingClip]);

  // Clear the clips and trigger a refresh
  const refreshClipsCallback = useCallback(() => {
    setClips(undefined);
  }, [setClips]);

  // Set the current navigation in redux state
  const setNavigation = (nav: NavActionProps) => {
    dispatch(setNav(nav));
  }

  // Set the current clip for editing
  const handleEditClip = () => {
    setAnchorEl(null);
    setClip(clipForEditing);
    setEditingClip(true);
  }

  // Set the clip for deletion
  const setClipForDeletionCallback = useCallback((clip: ClipData) => {
    setClipForEditing(clip);
    setShowConfirmDelete(true);
  }, [setClipForEditing, setShowConfirmDelete]);

  /**
   * Clip popup menu
   */
   
  // Anchor the menu to the selected menu item and set the clip for editing
  const setClipAndAnchorCallback = useCallback((element: HTMLElement, clip: ClipData) => {
    setAnchorEl(element);
    setClipForEditing(clip);
  }, [setAnchorEl, setClipForEditing]);

  // User selects delete from the menu
  const handleSelectClipDelete = () => {
    setAnchorEl(null);
    setShowConfirmDelete(true);
  }

  // Delete clip
  const handleClipDelete = useCallback(async (clip: ClipData | undefined) => {
    // Don't bother if there is no access token or clip
    if (!accessToken || !clip) return;
    setSubmitting(true);
    if (await deleteClip(clip.id, accessToken)) {
      dispatch(setNotification({
        show: true,
        message: 'Clip deleted',
        type: 'success',
        icon: 'none',
        duration: 3000
      }));
      setShowConfirmDelete(false);
      refreshClipsCallback();
    // Failure
    } else {
      dispatch(setNotification({
        show: true,
        message: 'Error deleting clip',
        type: 'error',
        icon: 'none',
        duration: 4000
      }));
    }
    setClipForEditing(undefined);
    setSubmitting(false);
  }, [accessToken, dispatch, refreshClipsCallback, setShowConfirmDelete]);

  /**
   * LOTTA USEEFFECT
   */
  
  // Track the scroll position for displaying the FAB
  const [hideFab, setHideFab] = useState<boolean>(false);
  useEffect(() => {
    // Only continue of on room page
    if (!props.nav.roomNo) return;

    const handleScroll = () => setHideFab(window.pageYOffset > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [props.nav.roomNo, setHideFab]);

  // Reload chapter image on chapter change
  useEffect(() => {
    setChapterLoaded(false);
  }, [props.nav.chapterId, setChapterLoaded]);

  // Clear the clips when the room is changed
  useEffect(() => {
    setClips(undefined);
  }, [chapterId, sideNo, checkpointNo, roomNo])

  // Load clip data
  useEffect(() => {
    // Ignore if clips are present
    if (clips) return;

    let unmounted = false;
    // Clear the clips
    setClip(undefined);
    setClips(undefined);
    // Declare function to set the clips
    const fetchClips = async () => {
      const clips = await getClips(chapterId, sideNo, checkpointNo, roomNo);
      if (!unmounted) setClips(clips);
    }
    // Wait before fetching clips
    const timeout = setTimeout(fetchClips, 1000);
    // Cleanup
    return () => {
      clearTimeout(timeout);
      unmounted = true;
    }
  }, [chapterId, sideNo, checkpointNo, roomNo, clips, setClips]);

  // Check for server timeout
  useEffect(() => {
    const awaitClips = () => { 
      if(!clips) setClips(null);
    }
    const timeout = setTimeout(awaitClips, 10000);
    return () => clearTimeout(timeout);
  })

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
          <div className={ commonClasses.aspectBox }>
            <Skeleton className={ commonClasses.aspectContent } variant='rect' />
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
              prevNav={ prevSideNo ? { chapterId: chapterId, sideNo: prevSideNo.toString() } : {} }
              nextNav={ nextSideNo ? { chapterId: chapterId, sideNo: nextSideNo.toString() } : {} }
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
      {/* Show the clip info */}
      { clip && !editingClip ? (
        <Clip
          clip={ clip }
          close={ setClipCallback }
          setEdit={ setEditClipCallback }
          setDelete={ setClipForDeletionCallback }
          currentUser={ currentUser }
          mute={ false }
        />
      // Edit a clip 
      ) : clip && editingClip ? (
        <NewClip open={ editingClip } setOpen={ stopEditCallback } refreshClips={ refreshClipsCallback } clipData={ clip }/>
      // Create a new clip
      ) : editingClip && (
        <NewClip open={ editingClip } setOpen={ stopEditCallback } refreshClips={ refreshClipsCallback }/>
      )}
          
      {/* Show clip deletion confirmation dialog */}
      <Dialog
        open={ showConfirmDelete }
        onClose={ () => setShowConfirmDelete(false) }
        aria-labelledby='clip-delete-dialog-title'
        aria-describedby='clip-delete-dialog-description'
      >
        <DialogTitle id='clip-delete-dialog-title'>Confirm clip deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id='clip-delete-dialog-description'>This will permanently delete this clip. Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={ () => setShowConfirmDelete(false) }>Cancel</Button>
          <div className={ commonClasses.centerBox }>
            <Button variant='contained' onClick={ () => handleClipDelete(clipForEditing)  } disabled={ submitting } color='secondary'>Delete Clip</Button>
            { submitting && <CircularProgress className={ commonClasses.centerContent } size={ 24 }/> }
          </div>
        </DialogActions>
      </Dialog>

      <Grid container spacing={ 3 }>
        {/* Left Side */}
        <Grid item xs={ 12 } lg={ 5 }>
          {/* If the room is present render it */}
          { room ? (
            <React.Fragment>
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
                <RoomNav data={ props.data } nav={ props.nav }/>
              </Grid>
            </React.Fragment> 
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

        {/* Render the clips*/}
        <Grid item xs={ 12 } lg={ 7 }>
          {/* Loaded */}
          { clips && clips.length > 0 ? (
            <React.Fragment>
              <Menu
                id="clip-actions-menu"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ () => setAnchorEl(null) }
              >
                <MenuItem
                  onClick={ handleEditClip }
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={ handleSelectClipDelete }
                >
                  Delete
                </MenuItem>
              </Menu>
              <List classes={{ root: commonClasses.noPadding }}>
                { clips.map((clip, index) => (
                  <ClipItem
                    key={ index }
                    clip={ clip }
                    handleSelect={ setClipCallback }
                    anchorMenu={ setClipAndAnchorCallback }
                    currentUser={ currentUser }
                    refreshClips={ refreshClipsCallback }
                  />
                ))}
              </List>
            </React.Fragment>
          ) : (
            // No clips
            <div className={ classes.centeredWrapper }>
              { clips && clips.length === 0 ? (
                <Typography variant='h5' color='textSecondary'>No clips found</Typography>
              // Loading
              ) : clips === undefined ? (
                <CircularProgress color='primary' size={ 56 }/>
              // Error
              ) : (
                <Typography variant='h5' color='secondary'>An error occured while loading clips</Typography>
              )}
            </div>
          )}
        </Grid>
      </Grid>
      {/* New clip button for current room */}
      { room && accessToken && (
        <Fab disabled={ hideFab } variant="extended" className={ classes.newClipButton } onClick={ () => setEditingClip(true) }>
          <AddToQueue className={ classes.newClipIcon } />
          Submit Clip
        </Fab>
      )}
    </React.Fragment>
  );
}