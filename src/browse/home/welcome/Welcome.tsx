import React, { useEffect, useState } from 'react';
import { Paper, Typography, makeStyles, Fade } from '@material-ui/core';
import fetchJson from '../../../utils/fetch-json';
import Skeleton from '@material-ui/lab/Skeleton';

const contentUrl = 'https://cdn.berrycamp.com/file/berrycamp/static/welcome/content.json';
const imagesUrl = 'https://cdn.berrycamp.com/file/berrycamp/static/welcome/images/';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 900,
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  loadingHeading: {
    transform: 'transform: scale(1, 0.80)',
    height: 50,
  },
  loadingText: {
    transform: 'transform: scale(1, 0.80)',
    height: 35,
  },
  welcomeImage: {
    width: '100%',
    objectFit: 'cover',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  // Aspect ratio container
  loadingImageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  accent: {
    color: theme.palette.secondary.main,
  }
}));

export default React.memo(() => {
  const classes = useStyles();
  const [content, setContent] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Fetch the page content
    fetchJson<string[]>(contentUrl).then((res) => {
      setContent(res);
    });
    // Select a random image to show
    setImage(`${ imagesUrl }${ Math.floor(Math.random() * 6) + 1 }.png`);
  }, [setContent, setImage]);
  
  return (
    <Fade in={true}>
      <Paper className={ classes.paper }>
        { content.length !== 0 ? (
          <Typography className={ classes.heading } variant='h5'
          >
            Welcome to the Mount Celeste <span className={ classes.accent }>Berry Camp</span>!
          </Typography> 
        ) : (
          <Skeleton className={ classes.loadingHeading }/>
        )}

        { content.length !== 0 ? (
          <Typography>{ content[0] }</Typography>
        ) : (
          <React.Fragment>
            <Skeleton className={ classes.loadingText }/>
            <Skeleton className={ classes.loadingText }/>
          </React.Fragment>
        )}

        { !loaded && (
          <div className={ classes.loadingImageContainer }>
            <Skeleton className={ classes.loadingImage } variant="rect" />
          </div>
        )}
        <Fade in={ loaded }>
          <img
            className={ `${classes.welcomeImage} pixelated` }
            src={ image }
            style={ loaded ? {} : { display: 'none' } }
            alt='Animation of madeline in a campsite in game'
            onLoad={ () => setLoaded(true) }
          />  
        </Fade>

        { content.length !== 0 ? (
          <Typography>{ content[1] }</Typography> 
        ) : (
          <Skeleton width='20%' className={ classes.loadingText }/>
        )}
      </Paper>
    </Fade>
  );
});