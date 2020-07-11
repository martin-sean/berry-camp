import React, { useState } from 'react';
import { ListItem, Paper, Typography, Chip, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import commonStyles from 'utils/common-styles';
import { ClipData } from 'api/clip';
import { formatSecondsWords } from 'utils/clip-time';
import { Skeleton } from '@material-ui/lab';
import { MoreVert } from '@material-ui/icons';
import { CurrentUser } from 'api/authenticate';
import Like from './like';

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  clipItem: {
    marginBottom: theme.spacing(2),
  },
  clipPaper: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  thumbnailWrapper: {
    minWidth: 120,
    marginRight: theme.spacing(2),
  },
  thumbnail: {
    objectFit: 'cover',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    margin: theme.spacing(0.5),
    maxWidth: 125,
    textOverflow: 'ellipsis',
  },
  duration: {
    textAlign: 'right',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

interface ClipItemProps {
  clip: ClipData,
  handleSelect: (clip?: ClipData) => void,
  anchorMenu: (element: HTMLElement, clip: ClipData) => void,
  refreshClips: () => void,
  currentUser: CurrentUser | null
}

export default (props: ClipItemProps) => {
  const classes = useStyles();

  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);

  const isModerator = props.currentUser && props.currentUser.moderator;
  const isAuthor = props.currentUser && props.currentUser.username === props.clip.author?.username;

  // Render nicer
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up('sm'));

  // Handle opening the options menu on a clip item
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    props.anchorMenu(event.currentTarget, props.clip);
  }

  // Handle item select
  const handleSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    props.handleSelect(props.clip)
  }

  return (
    <React.Fragment>
      <ListItem
        className={ classes.clipItem }
        button
        classes={{ gutters: classes.noPadding }}
        onClick={ handleSelect }
      >
        <Paper className={ classes.clipPaper }>
          {/* Left Side */}
          <div className={ classes.leftSide }>
            {/* Like button */}
            <Like clipId={ props.clip.id } likes={ props.clip.likes || 0 } liked={ props.clip.userLikes || false } />
            {/* Thumbnail */}
            <div className={ classes.thumbnailWrapper }>
              <div className={ classes.aspectBox }>
                { thumbnailLoaded && <Skeleton className={ classes.aspectContent }/>}
                <img
                  className={ `${ classes.aspectContent } ${ classes.thumbnail }` }
                  src={ `https://i3.ytimg.com/vi/${ props.clip.video_id }/default.jpg` }
                  style={ thumbnailLoaded ? {} : { display: 'none' } }
                  alt='Clip youtube thumbnail'
                  onLoad={ () => setThumbnailLoaded(true) }
                />
              </div>
            </div>
            {/* Clip Name */}
            <Typography className={ classes.title }>{ props.clip.name || 'Untitled' }</Typography>
          </div>
          {/* Right side */}
          <div className={ classes.rightSide }>
            {/* Tag */}
            { medium && props.clip.tags.length > 0 && (
              <Chip className={ classes.tag } label={ props.clip.tags[0].name }/>
            )}
            {/* Clip Length */}
            <Typography
              className={ classes.duration } 
              color='textSecondary'
            >
              { formatSecondsWords(props.clip.end_time - props.clip.start_time)}
            </Typography>

            {/* Render options if moderator or author */}
            { (isModerator || isAuthor) && (
              <IconButton
                aria-label="more"
                aria-controls="clip-actions-menu"
                aria-haspopup="true"
                onClick={ handleMenuOpen }
                onMouseDown={ (event) => event.stopPropagation() }
              >
                <MoreVert/>
              </IconButton>
            )}
          </div>
        </Paper>
      </ListItem>
    </React.Fragment>
  );
}