import React, { useState, useEffect } from 'react';

import  './Room.css';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Fade, Theme, Typography, Divider, Modal, Backdrop, useTheme, useMediaQuery } from '@material-ui/core'

import { DataTree } from 'api/data';
import { Navigation } from 'redux/reducers';

const imageHost = 'https://cdn.berrycamp.com/file/strawberry-house/screens/'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
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
  nav: Navigation,
  setDocTitle: (title: string | undefined) => void
}

export default React.memo((props: RoomProps) => {
  const classes = useStyles();
 
  // Breakpoints for showing large image on click
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  
  // Room image loaded
  const [loaded, setLoaded] = useState(false);
  // Large image dialog
  const [open, setOpen] = useState(false);
  
  const chapter = props.data[props.nav.chapterId];
  const side = chapter?.sides[props.nav.sideNo];
  const checkpoint = side?.checkpoints[props.nav.checkpointNo];
  const room = checkpoint?.rooms[props.nav.roomNo];

  props.setDocTitle(room?.name);

  const image = imageHost + props.nav.chapterId + 
    '/' + props.nav.sideNo +
    '/' + props.nav.checkpointNo +
    '/' + props.nav.roomNo + 
    '.png'

  const errorImage = '/img/error.jpg';

  useEffect(() => {
    setLoaded(false);
  }, [props.nav.chapterId, props.nav.sideNo, props.nav.checkpointNo, props.nav.roomNo]);

  return (
    <div className={ classes.wrapper }>
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

      { room ? (
        <React.Fragment>
            <Typography variant="h5" color="textPrimary">{ room?.name }</Typography>
            <Typography className={ classes.info } color="textSecondary">{ chapter.chapter_no && `Chapter ${ chapter.chapter_no }: `}{ chapter?.name }</Typography>
            <Typography className={ classes.info } color="textSecondary">{ side?.name } Side</Typography>
            <Typography className={ classes.info } color="textSecondary">{ checkpoint?.name }</Typography>
            <Divider className={ classes.divider } />
            <Typography color="textSecondary">Room ID: { checkpoint?.abbreviation + '-' + props.nav.roomNo }</Typography>
            <Typography color="textSecondary">Debug ID: { room?.debug_id }</Typography>
          </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h5" color="textPrimary">Room does not exist</Typography>
          <Typography color="textSecondary">Please select a room from the menu</Typography>
        </React.Fragment>
      )}
    </div>
  )
});