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
  logo: {
    height: 450,
    width: '100%',
    objectFit: 'cover',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
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
    <Paper className={ classes.paper }>
      { content.length !== 0 ? (
        <Typography className={ classes.heading } variant='h5'>{ content[0] }</Typography> 
      ) : (
        <Skeleton className={ classes.loadingHeading }/>
      )}

      { content.length !== 0 ? (
        <Typography>{ content[1] }</Typography>
      ) : (
        <React.Fragment>
          <Skeleton className={ classes.loadingText }/>
          <Skeleton className={ classes.loadingText }/>
        </React.Fragment>
      )}

      { !loaded && (
        <Skeleton className={ classes.logo } variant="rect" />
      )}
      <Fade in={ loaded }>
        <img
          className={ `${classes.logo} pixelated` }
          src={ image }
          style={ loaded ? {} : { display: 'none' } }
          alt='Animation of madeline in a campsite in game'
          onLoad={ () => setLoaded(true) }
        />  
      </Fade>

      { content.length !== 0 ? (
        <Typography>{ content[2] }</Typography> 
      ) : (
        <Skeleton width='20%' className={ classes.loadingText }/>
      )}
    </Paper>
  );
});