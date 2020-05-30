import React, { useEffect, useState } from 'react';
import { makeStyles, Typography, Paper, Container } from '@material-ui/core';
import fetchJson from 'utils/fetch-json';
import Skeleton from '@material-ui/lab/Skeleton';

const contentUrl = 'https://cdn.berrycamp.com/file/berrycamp/static/privacy/content.json';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  heading: {
    marginBottom: theme.spacing(3),
  },
  paragraph: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingText: {
    transform: 'transform: scale(1, 0.80)',
    height: 35,
  },
}));

export default () => {
  const classes = useStyles();
  const [content, setContent] = useState<string[]>([]);
  
  useEffect(() => {
    // Fetch the page content
    fetchJson<string[]>(contentUrl).then((res) => {
      setContent(res);
    });
  }, [setContent]);

  return (
    <Container maxWidth='md'>
      <div className={ classes.toolbar }/>
      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h5'>Privacy</Typography>
        { content.length !== 0 ? (
          <React.Fragment>
            <Typography className={ classes.paragraph } color='textSecondary'>{ content[0] }</Typography>
            <Typography className={ classes.paragraph } color='textSecondary'>{ content[1] }</Typography>
            <Typography className={ classes.paragraph } color='textSecondary'>{ content[2] }</Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Skeleton className={ classes.loadingText }/>
            <Skeleton className={ classes.loadingText }/>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  )
}