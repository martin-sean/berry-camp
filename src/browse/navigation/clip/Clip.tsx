import React, { useState, useEffect } from 'react';
import { Dialog, Paper, Typography, Chip, Avatar, Slider, IconButton, Box } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import commonStyles from 'utils/common-styles';
import { ClipData } from 'api/clip';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import { formatSeconds } from 'utils/clip-time';
import { CurrentUser } from 'api/authenticate';
import { useSelector } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import Volume from 'pages/common/volume';

const useStyles = makeStyles((theme) => ({
  ...commonStyles,  
  playerBox: {

  },
  slider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  sliderTrack: {
    height: '5px',
    borderRadius: '3px',
  },
  sliderThumb: {
    display: 'none',
    height: 0,
    width: 0,
    padding: 0,
    margin: 0,
  },
  marksHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  // Determines the size of the dialog
  dialogPaper: {
    [theme.breakpoints.down('md')]: {
      width: '95%',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 800,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 1000,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  date: {
    diplay: 'flex',
    flexDirection: 'row',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  description: {
    marginTop: theme.spacing(2),
  },
}));

interface ClipProps {
  clip: ClipData,
  close: (clip?: ClipData) => void,
  setEdit: () => void,
  setDelete: (clip: ClipData) => void,
  currentUser: CurrentUser | null,
}

/**
 * Render clip dialog view
 */
export default (props: ClipProps) => {
  const classes = useStyles();

  const createdDate = new Date(props.clip.created_at).toLocaleDateString();

  const isModerator = props.currentUser && props.currentUser.moderator;
  const isAuthor = props.currentUser && props.currentUser.username === props.clip.author?.username;

  // YouTube player reference
  const [player, setPlayer] = useState<YT.Player>();
  // Remember current clip time 
  const [sliderValue, setSliderValue] = useState<number>(props.clip.start_time);
    
  const volume = useSelector((store: GlobalStore) => store.volume);

  // YouTube player is ready
  const handleReady = (event: { target: YT.Player }) => {
    setPlayer(event.target);
  }

  // Handle user changing slider time
  const handleSliderChange = (event: React.ChangeEvent<any>, value: number | number[]) => {
    if (!player) return;
    const time = value as number;
    setSliderValue(time);
    player.seekTo(time, true);
  }

  // Set the volume on change
  useEffect(() => {
    if (!player) return;
    volume === 0 ? player.mute() : player.unMute();
    player.setVolume(volume);
  }, [volume, player])

  // Loop youtube video
  useEffect(() => {
    if (!player) return;
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
        const currentTime = player.getCurrentTime();
        if (currentTime > props.clip.end_time || currentTime < props.clip.start_time ) {
          player.seekTo(props.clip.start_time, true);
          setSliderValue(props.clip.start_time);
        } else {
          setSliderValue(currentTime);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player, props.clip.start_time, props.clip.end_time, setSliderValue])

  return (
    <Dialog
      open={ true }
      onClose={ () => props.close() }
      classes={{ paper: classes.dialogPaper }}
    >
      <Paper
        className={ classes.wrapper }
      >
        {/* Video player */}
        <div className={ `${ classes.aspectBox } ${ classes.playerBox }`}>
          <YouTube
            className={ classes.aspectContent }
            videoId={ props.clip.video_id }
            onReady={ handleReady }
            opts={{
              playerVars: {
                start: props.clip.start_time,
                mute: 1,
                controls: 0,
                autoplay: 1,
                loop: 1,
                playlist: props.clip.video_id,
                enablejsapi: 1,
                showinfo: 0,
                fs: 1,
              }}
            }
          />
        </div>
        {/* Slider */}
        <Slider
          className={ classes.slider }
          classes={{ thumb: classes.sliderThumb, track: classes.sliderTrack, rail: classes.sliderTrack }}
          value={ sliderValue }
          min={ props.clip.start_time }
          max={ props.clip.end_time }
          onChange={ handleSliderChange }
        />
        <div className={ classes.marksHolder }>
          <Typography>{ formatSeconds(0) }</Typography>
          <Typography>{ formatSeconds(props.clip.end_time - props.clip.start_time) }</Typography>
        </div>

        {/* Clip info title */}
        <Typography variant='h5'>{ props.clip.name || 'Untitled' }</Typography>
        {/* Author and date */}
        { props.clip.author ? (
          <div className={ classes.date }>
            <Chip
              className={ classes.tag }
              clickable
              component={ Link }
              to={ `/profile/${ props.clip.author.username }` }
              avatar={ <Avatar>{ props.clip.author.username.charAt(0) }</Avatar> }
              label={ props.clip.author.username }
              variant='outlined'
            />
            <Typography color='textSecondary' component='span'>posted on { createdDate }</Typography>
          </div>
        ) : (
          <Typography color='textSecondary' component='span'>Posted on { createdDate }</Typography>
        )}
        {/* Tags */}
        <div className={ classes.tags }>
          { props.clip.tags.map((tag, index) => (
            <Chip className={ classes.tag } key={ index } label={ tag.name }/>
          ))}
        </div>
        {/* Description */}
        <Typography className={ classes.description }>
          { props.clip.description || 'No description' }
        </Typography>

        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <Volume />
          {/* Owner actions */}
          { (isModerator || isAuthor) && (
            <React.Fragment>
              <IconButton onClick={ props.setEdit }><EditIcon/></IconButton>
              <IconButton onClick={ () => props.setDelete(props.clip) }><DeleteIcon/></IconButton>
            </React.Fragment>
          )}
        </Box>
      </Paper>
    </Dialog>
  );
}