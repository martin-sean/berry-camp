import React, { useState } from 'react';
import commonStyles from 'utils/common-styles';
import { makeStyles, ListItem, Paper, Typography, Chip, IconButton } from '@material-ui/core';
import { ClipData, deleteClip } from 'api/clip';
import { formatSecondsWords } from 'utils/clip-time';
import { useSelector } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import { Skeleton } from '@material-ui/lab';
import { Delete } from '@material-ui/icons';

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
  deleteButton: {
    height: '100%',
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
  handleSelect: (clip?: ClipData) => void;
}

export default (props: ClipItemProps) => {
  const classes = useStyles();
  const commonClasses = commonStyles();

  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);

  // Delete clip
  // TODO: Fix
  const handleClipDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    if (!accessToken) return;
    await deleteClip(id, accessToken || '');
  }

  return (
    <ListItem
      className={ classes.clipItem }
      button
      classes={{ gutters: commonClasses.noPadding }}
      onClick={ () => props.handleSelect(props.clip) }
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
          <Typography variant='h6'>{ props.clip.name || 'No name' }</Typography>
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
          <IconButton
            className={ classes.deleteButton }
            onClick={ (event) => handleClipDelete(event, props.clip.id) }
            onMouseDown={ (event) => event.stopPropagation() }
            color='secondary'
          >
            <Delete/>
          </IconButton>
        </div>
      </Paper>
    </ListItem>
  );
}