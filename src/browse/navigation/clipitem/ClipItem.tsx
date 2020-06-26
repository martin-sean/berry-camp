import React, { useState } from 'react';
import commonStyles from 'utils/common-styles';
import { makeStyles, ListItem, Paper, Typography, Chip, IconButton } from '@material-ui/core';
import { ClipData } from 'api/clip';
import { formatSecondsWords } from 'utils/clip-time';
import { Skeleton } from '@material-ui/lab';
import { MoreVert } from '@material-ui/icons';
import { CurrentUser } from 'api/authenticate';

const useStyles = makeStyles(theme => ({
  clipItem: {
    marginBottom: theme.spacing(2),
  },
  clipPaper: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailWrapper: {
    minWidth: '120px',
    marginRight: theme.spacing(2),
  },
  thumbnail: {
    objectFit: 'cover',
  },
  moreButton: {
    // height: '100%',
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  duration: {
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
  const commonClasses = commonStyles();

  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);

  const isModerator = props.currentUser && props.currentUser.moderator;
  const isAuthor = props.currentUser && props.currentUser.username === props.clip.author?.username;

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
        classes={{ gutters: commonClasses.noPadding }}
        onClick={ handleSelect }
      >
        <Paper className={ classes.clipPaper }>
          {/* Left Side */}
          <div className={ classes.flexRow }>
            <div className={ classes.thumbnailWrapper }>
              <div className={ commonClasses.aspectBox }>
                { thumbnailLoaded && <Skeleton className={ commonClasses.aspectContent }/>}
                <img
                  className={ `${ commonClasses.aspectContent } ${ classes.thumbnail }` }
                  src={ `https://i3.ytimg.com/vi/${ props.clip.video_id }/default.jpg` }
                  style={ thumbnailLoaded ? {} : { display: 'none' } }
                  alt='Clip youtube thumbnail'
                  onLoad={ () => setThumbnailLoaded(true) }
                />
              </div>
            </div>
            <Typography variant='h6'>{ props.clip.name || 'Untitled' }</Typography>
          </div>
          {/* Right side */}
          <div className={ classes.flexRow }>
            {/* Render first two tags */}
            { props.clip.tags.slice(0, 2).map((tag, index) => (
              <Chip key={ index } className={ classes.tag } label={ tag.name }/>
            ))}
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
                className={ classes.moreButton }
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