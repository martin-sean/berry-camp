import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography, Container, Chip } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import NavbarSpacer from 'pages/common/navbarspacer';
import urlSetter from 'api/url-setter';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  heading: {
    // marginBottom: theme.spacing(3),
  },
  paragraph: {
    fontSize: '1.15rem',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  userHeading: {
    display: 'flex',
  },
  chip: {
    marginLeft: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const { username } = useParams();
  type UserType = { username: string, moderator: boolean }
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetch(urlSetter(`/v1/user/username/${ username }`), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.ok) {
        const user = await res.json() as UserType;
        setUser(user);
      }
    });
  }, [username, setUser]);

  return (
    <Container maxWidth='md'>
      <NavbarSpacer />
      <Paper className={ classes.paper }>
        { user ? (
          <div className={ classes.userHeading }>
            <Typography className={ classes.heading } variant='h5'>{ user.username }</Typography>
            { user.moderator && (
              <Chip className={ classes.chip } label="MODERATOR" color='primary' variant="outlined" />
            )}
          </div>
        ) : (
          <Skeleton variant="rect" width={ 250 } height={ 30 }/>
        )}
      </Paper>
    </Container>
  )
}