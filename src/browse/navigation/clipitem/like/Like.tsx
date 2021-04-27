import React, { useState, useCallback } from 'react';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@material-ui/icons';
import { Typography, makeStyles, Button, debounce } from '@material-ui/core';
import { likeClip, unlikeClip } from 'fetch/clip';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStore } from 'redux/reducers';

const useStyles = makeStyles(theme => ({
  button: {
    flex: '0 0 50px',
    minWidth: 0,
    height: '100%',
  },
  buttonRoot: {
    '&.Mui-disabled': {
      color: 'inherit',
    }
  },
  disabled : {
    color: 'inherit',
  },
  buttonLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: theme.spacing(1),
    lineHeight: '1em',
  },
}));

interface LikeProps {
  clipId: number,
  likes: number,
  liked: boolean,
}

export default (props: LikeProps) => {
  const classes = useStyles();
  // Simulate number of likes
  const [likesOffset, setLikesOffset] = useState(0);
  // Simulate the user liking a clip in the front end
  const [liked, setLiked] = useState(props.liked);

  const dispatch = useDispatch();
  const accessToken = useSelector((store: GlobalStore) => store.accessToken)

  // Handle a user liking/unliking a clip
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Ignore likes if not logged in
    if (!accessToken) return;

    stopPropagation(event)
    // Simulate likes
    setLikesOffset(props.liked !== liked ? 0 : props.liked ? -1 : 1);
    setLiked(!liked);
    // Handle actual like
    handleLike(accessToken, liked);
  }
  
  // Like the clip, debounce the function to every second
  const handleLike = useCallback(debounce((accessToken: string | undefined, liked: boolean) => {
    if (!accessToken) return;
    liked ? unlikeClip(props.clipId, accessToken, dispatch) : likeClip(props.clipId, accessToken, dispatch);
  }, 1000), []);
  

  // Stop the propagation of the click through to the menu item below
  const stopPropagation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Button
      className={ classes.button }
      classes={{ root: classes.buttonRoot, label: classes.buttonLabel, disabled: classes.disabled }}
      disabled={ !Boolean(accessToken) }
      onClick={ handleClick }
      onMouseDown={ stopPropagation }
    >
      { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      <Typography className={ classes.text }>{ props.likes + likesOffset }</Typography>
    </Button>
  )
}