import React, { useState, useEffect } from 'react';

import  './Room.css';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Fade, Theme, Typography, Divider, Button, Snackbar, Grid, Slide, Modal, Backdrop, useTheme, useMediaQuery } from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { Alert } from '@material-ui/lab';
import { DataTree } from '../../../../api/Data';
import { CurrentRoom } from '../../../../redux/reducers';

const imageHost = 'https://cdn.berrycamp.com/file/strawberry-house/screens/'

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      cursor: 'pointer',
    },
  },
  imageWrapper: {
    paddingBottom: theme.spacing(1),
  },
  // Aspect ratio container
  loadingImageContainer: {
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
  },
  loadingImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  info: {
    fontSize: '12pt',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  center: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImage: {
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
    [theme.breakpoints.up('xs')]: {
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 640,
    },
    [theme.breakpoints.up('md')]: {
      width: 960,
    },
    [theme.breakpoints.up('lg')]: {
      width: 1280,
    },
  },
}));

interface RoomProps {
  data: DataTree,
  room: CurrentRoom,
  setDocTitle: (title: string | undefined) => void
}

export default React.memo((props: RoomProps) => {
  const classes = useStyles();
 
  // Breakpoints for showing large image on click
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  
  // Room image loaded
  const [loaded, setLoaded] = useState(false);
  // Show Snackbar
  const [copied, setCopied] = useState(false);
  // Large image dialog
  const [open, setOpen] = useState(false);
  
  const chapter = props.data[props.room.chapterId];
  const side = chapter?.sides[props.room.sideNo];
  const checkpoint = side?.checkpoints[props.room.checkpointNo];
  const room = checkpoint?.rooms[props.room.roomNo];

  props.setDocTitle(room?.name);

  const image = imageHost + props.room.chapterId + 
    '/' + props.room.sideNo +
    '/' + props.room.checkpointNo +
    '/' + props.room.roomNo + 
    '.png'

  const errorImage = '/img/error.jpg';

  useEffect(() => {
    setLoaded(false);
  }, [props.room.chapterId, props.room.sideNo, props.room.checkpointNo, props.room.roomNo]);

  const copyUrl = () => {
    navigator.clipboard.writeText(
      window.location.href.replace(window.location.search, '') +
      `?chapter=${ props.room.chapterId }` +
      `&side=${ props.room.sideNo }` +
      `&checkpoint=${ props.room.checkpointNo }`+
      `&room=${ props.room.roomNo  }`
    );
    setCopied(true);
  }

  return (
    <React.Fragment>
      {/* Image popup */}
      <Modal
        className={ classes.modal }
        open={ open }
        onClose={ () => setOpen(false) }
        closeAfterTransition
        BackdropComponent={ Backdrop }
      >
        <Fade in={ open }>
          <img
            className={ `${ classes.largeImage } pixelated` }
            src={ image }
            alt="Large screemshot of current room"
            onClick={ () => setOpen(false) }
          />
        </Fade>
      </Modal>

      <div className={ classes.imageWrapper }>
        {
          !loaded &&
          <div className={ classes.loadingImageContainer }>
            <Skeleton variant="rect" className={ classes.loadingImage } />
          </div>
        }
        <Fade in={ loaded }>
          <img
            className={ `${ classes.image } pixelated` }
            src={ image }
            alt="Screenshot of current room"
            style={ loaded ? {} : { display: 'none'} }
            onLoad={ () => setLoaded(true) }
            onClick={ () => matches && setOpen(!open) }
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
            <Grid container justify='space-between'>
              <Grid item>
                <Typography color="textSecondary">Room ID: { checkpoint?.abbreviation + '-' + props.room.roomNo }</Typography>
                <Typography color="textSecondary">Debug ID: { room?.debug_id }</Typography>
              </Grid>
              <Grid item className={ classes.center }>
                <Button variant='outlined' onClick={ copyUrl }>Copy link</Button>
              </Grid>
            </Grid>
            <Snackbar
              open={ copied }
              onClose={ () => setCopied(false) }
              anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
              autoHideDuration={ 2000 }
              TransitionComponent={ Slide }
            >
              <Alert variant='filled' severity='info' icon={ <FileCopyIcon /> }>Room link was copied</Alert>
            </Snackbar>
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