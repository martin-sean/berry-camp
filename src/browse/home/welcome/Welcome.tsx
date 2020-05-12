import React, { useEffect, useState } from 'react';
import { Paper, Typography, makeStyles, Fade } from '@material-ui/core';
import fetchJson from 'utils/fetch-json';
import Skeleton from '@material-ui/lab/Skeleton';

const welcomeUrl = 'https://cdn.berrycamp.com/file/berrycamp/static/welcome/';
const contentUrl = `${ welcomeUrl }content.json`;
const quotesUrl = `${ welcomeUrl }quotes.json`;
const imagesUrl = `${ welcomeUrl }images/`;
const imageCount = 7; // Number of welcome images (1 - n)

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 900,
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  },
  quoteWrapper: {
    marginTop: theme.spacing(3),
  },
  quote: {
    textAlign: 'center',
    fontSize: '1.25rem',
    fontStyle: 'italic',
  },
}));

export default React.memo(() => {
  const classes = useStyles();
  const [content, setContent] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');
  const [loaded, setLoaded] = useState(false);
  const [quote, setQuote] = useState<string>('');
  
  useEffect(() => {
    // Fetch the page content
    fetchJson<string[]>(contentUrl).then((res) => {
      setContent(res);
    });
    // Get a random quote to show
    fetchJson<string[]>(quotesUrl).then((res) => {
      const randomQuote = res[Math.floor(Math.random() * res.length)];
      setQuote(randomQuote);
    });
    // Select a random image to show
    setImage(`${ imagesUrl }${ Math.floor(Math.random() * imageCount) + 1 }.png`);
  }, [setContent, setQuote, setImage]);
  
  return (
    <Fade in={true}>
      <React.Fragment>
        <Paper className={ classes.paper }>
          <Typography
            className={ classes.heading }
            variant='h5'
          >
            Welcome to the Mount Celeste <span className={ classes.accent }>Berry Camp</span>!
          </Typography>

          { content.length !== 0 ? (
            <Typography className={ classes.paragraph } color='textSecondary'>{ content[0] }</Typography>
          ) : (
            <React.Fragment>
              <Skeleton className={ classes.loadingText }/>
              <Skeleton className={ classes.loadingText }/>
            </React.Fragment>
          )}

          { content.length !== 0 ? (
            <Typography className={ classes.paragraph }>{ content[1] }</Typography> 
          ) : (
            <Skeleton width='20%' className={ classes.loadingText }/>
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
        </Paper>
        {/* Render a random quote */}
        <Paper className={ `${ classes.paper } ${ classes.quoteWrapper }`}>
          { quote ? (
            <Typography className={ classes.quote } color='textSecondary'>"{ quote }"</Typography> 
          ) : (
            <Skeleton className={ classes.loadingText }/>
          )}
        </Paper>
      </React.Fragment>
    </Fade>
  );
});