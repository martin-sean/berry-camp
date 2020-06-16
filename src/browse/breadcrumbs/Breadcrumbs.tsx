import React, { useState } from 'react';
import { Navigation, NavActionProps } from 'redux/reducers';
import { makeStyles, Typography, Breadcrumbs, Link, Tooltip, Snackbar, Slide, Button } from '@material-ui/core';
import { DataTree } from 'api/data';
import { useDispatch } from 'react-redux';
import { SetNavAction, ClearNavAction, setNav, clearNav } from 'redux/actions';
import Alert from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  wrapper:{
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  firstLink: {
    marginRight: theme.spacing(1),
  },
  centerLink: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  lastLink: {
    marginLeft: theme.spacing(1),
  },
  link: {
    fontSize: '1.1rem',
    whiteSpace: 'nowrap',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
  },
  
  button: {
    marginRight: theme.spacing(1),
  },
}));

interface BreadCrumbsProps {
  data: DataTree,
  nav: Navigation,
}

export default (props: BreadCrumbsProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Show Snackbar
  const [copied, setCopied] = useState(false);
  
  const setNavigation = (nav: NavActionProps) => {
    dispatch<SetNavAction>(setNav(nav));
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(
      window.location.href.replace(window.location.search, '') +
      `?chapter=${ props.nav.chapterId }` +
      `${ props.nav.sideNo ? `&side=${ props.nav.sideNo }` : '' }` +
      `${ props.nav.checkpointNo ? `&checkpoint=${ props.nav.checkpointNo }` : '' }` +
      `${ props.nav.roomNo ? `&room=${ props.nav.roomNo }` : '' }`
    );
    setCopied(true);
  }

  const chapter = props.data[props.nav.chapterId];
  const side = chapter?.sides[props.nav.sideNo];
  const checkpoint = side?.checkpoints[props.nav.checkpointNo];
  const room = checkpoint?.rooms[props.nav.roomNo];
  
  return (
    <div className={ classes.wrapper }>
      <div>
        <Snackbar
          open={ copied }
          onClose={ () => setCopied(false) }
          anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
          autoHideDuration={ 2000 }
          TransitionComponent={ Slide }
        >
          <Alert variant='filled' severity='info' icon={ <FileCopyIcon /> }>Link copied</Alert>
        </Snackbar>
        <Breadcrumbs separator='>'>
          <Tooltip placement="top" title="Select another chapter">
            <Link
              className={ `${ classes.link } ${ classes.firstLink }` }
              component='button'
              color='inherit'
              onClick={() => dispatch<ClearNavAction>(clearNav()) }
            >
              Chapters
            </Link>
          </Tooltip>
          { chapter && (
            <Tooltip placement="top" title="Select another side">
              <Link
                className={ `${ classes.link } ${ classes.centerLink }` }
                component='button'
                color={ !side ? 'textPrimary' : 'inherit' }
                onClick={() => {
                  setNavigation({
                    chapterId: props.nav.chapterId
                  })
                }}
              >
                { chapter.name }
              </Link>
            </Tooltip>
          )}
          { chapter && side && (
            <Tooltip placement="top" title="Select another checkpoint">
              <Link
                className={ `${ classes.link } ${ classes.centerLink }` }
                component='button'
                color={ !checkpoint ? 'textPrimary' : 'inherit' }
                onClick={ () => {
                  setNavigation({ 
                    chapterId: props.nav.chapterId,
                    sideNo: props.nav.sideNo
                  })
                }}
              >
                { `${ side.name } side` }
              </Link>
            </Tooltip>
          )}
          { chapter && side && checkpoint && (
            <Tooltip placement="top" title="Select another room">
              <Link
                className={ `${ classes.link } ${ classes.centerLink }` }
                component='button'
                color={ !room ? 'textPrimary' : 'inherit' }
                onClick={ () => {
                  setNavigation({
                    chapterId: props.nav.chapterId,
                    sideNo: props.nav.sideNo,
                    checkpointNo: props.nav.checkpointNo
                  })
                }}
              >
                { checkpoint.name }
              </Link>
            </Tooltip>
          )}
          { chapter && side && checkpoint && room && (
            <Typography
              className={ `${ classes.link } ${ classes.lastLink }` }
              color='textPrimary'
            >
              { room.name }
            </Typography>
          )}
        </Breadcrumbs>
      </div>
      <Button className={ classes.button } variant='outlined' onClick={ copyUrl }>Copy link</Button>
    </div>
  );
}