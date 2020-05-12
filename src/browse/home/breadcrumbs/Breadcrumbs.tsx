import React, { useState } from 'react';
import { Navigation, NavActionProps } from 'redux/reducers';
import { makeStyles, Typography, Breadcrumbs, Link, Tooltip, Snackbar, Slide, Button } from '@material-ui/core';
import { DataTree } from 'api/Data';
import { useDispatch } from 'react-redux';
import { SetNavAction, ClearNavAction } from 'redux/actions';
import { SET_NAV, CLEAR_NAV } from 'redux/actionTypes';
import Alert from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  wrapper:{ 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: '1.25rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    whiteSpace: 'nowrap',
    letterSpacing: 'inherit',
    lineHeight: 'inherit',
  }
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
  
  const setNav = (nav: NavActionProps) => {
    dispatch<SetNavAction>({ type: SET_NAV, nav: nav });
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
              className={ classes.link }
              component='button'
              color='inherit'
              onClick={() => dispatch<ClearNavAction>({ type: CLEAR_NAV }) }
            >
              Chapters
            </Link>
          </Tooltip>
          { chapter && (
            <Tooltip placement="top" title="Select another side">
              <Link
                className={ classes.link }
                component='button'
                color='inherit'
                onClick={() => {
                  setNav({
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
                className={ classes.link }
                component='button'
                color='inherit'
                onClick={ () => {
                  setNav({ 
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
                className={ classes.link }
                component='button'
                color='inherit'
                onClick={ () => {
                  setNav({
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
            <Typography className={ classes.link }>{ room.name }</Typography>
          )}
        </Breadcrumbs>
      </div>
      <Button variant='outlined' onClick={ copyUrl }>Copy link</Button>
    </div>
  );
}