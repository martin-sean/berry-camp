import React, { useState } from 'react';
import { makeStyles, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import { logout } from 'authentication/authenticate';
import { useGoogleLogout } from 'react-google-login';
import clientId from 'authentication/client';
import { ClearAccessTokenAction, clearAccessToken } from 'redux/actions';
import { useHistory } from 'react-router-dom';
import * as Path from 'pages/paths';
import NavbarSpacer from 'pages/common/navbarspacer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
}));

export default () => {
  const classes = useStyles();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteClips, setDeleteClips] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  // Google logout hook
  const { signOut } = useGoogleLogout({
    clientId: clientId,
  });

  const handleDeleteClipsChange = () => {
    setDeleteClips(!deleteClips)
  }

  const handleConfirmChange = () => {
    setConfirm(!confirm);
  }

  const toggleOpen = () => {
    setShowDeleteDialog(!showDeleteDialog);
  }

  const deleteAccount = () => {
    fetch('/v1/user/current', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ accessToken }`
      },
      body: JSON.stringify({
        'deleteAccount': true,
        'deleteClips': deleteClips,
      }),
    }).then((res) => {
      if (res.ok) {
        // Sign out of google
        signOut();
        // Delete access token
        dispatch<ClearAccessTokenAction>(clearAccessToken());
        // Delete refresh cookie
        logout();
        history.push(Path.HOME);
      }
    });
  }

  // TODO: Handle this better, redirect to home page with an error message
  if(!accessToken) {
    return null;
  }

  return (
    <Container maxWidth='md'>
      <NavbarSpacer />
      {/* Delete account dialog */}
      <Dialog
        open={ showDeleteDialog }
        onClose={ toggleOpen }
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>This action will delete your account permanently including all comments. It will also make all your posted clips anonymous.</DialogContentText>
          <FormControlLabel
            label='Delete all clips I have posted'
            control={
              <Checkbox
                checked={ deleteClips }
                onChange={ handleDeleteClipsChange }
                name='Delete clips checkbox'
              />
            }
          />
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            label='Are you sure?'
            control={
              <Checkbox
                checked={ confirm }
                onChange={ handleConfirmChange }
                name='Confirm deletion checkbox'
              />
            }
          />
          <Button variant='contained' onClick={ toggleOpen }>Cancel</Button>
          <Button variant='contained' onClick={ deleteAccount } disabled={ !confirm } color='secondary'>Delete Account</Button>
        </DialogActions>
      </Dialog>
      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h5'>Account</Typography>
        <Typography className={ classes.paragraph } color='textSecondary'>Todo</Typography>
      </Paper>

      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h6'>Manage Account</Typography>
        <Button variant='outlined' size='small' onClick={ toggleOpen } color='secondary'>Delete my Account</Button>
      </Paper>
    </Container>
  )
}