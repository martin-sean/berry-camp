import React, { useState } from 'react';
import { makeStyles, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControlLabel, Checkbox, Container, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import { logout } from 'fetch/authenticate';
import { useGoogleLogout } from 'react-google-login';
import clientId from 'fetch/client';
import { clearAccessToken } from 'redux/actions';
import { useHistory } from 'react-router-dom';
import * as Path from 'pages/paths';
import NavbarSpacer from 'pages/common/navbarspacer';
import { deleteAccount } from 'fetch/user';
 
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
  submitWrapper: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface AccountProps {
  setShowUsernameDialog: (open: boolean) => void,
}

export default (props: AccountProps) => {
  const classes = useStyles();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteClips, setDeleteClips] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const accessToken = useSelector((store: GlobalStore) => store.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  // Google logout hook
  const { signOut } = useGoogleLogout({
    clientId: clientId,
  });

  // Toggle delete clips checkbox
  const handleDeleteClipsChange = () => {
    setDeleteClips(!deleteClips)
  }

  // Handle confirmation checkbox
  const handleConfirmChange = () => {
    setConfirm(!confirm);
  }

  // Toggle the deletion dialog
  const toggleOpen = () => {
    setShowDeleteDialog(!showDeleteDialog);
  }

  // Handle account deletion
  const handleDelete = async () => {
    // Don't bother if there is no access token
    if (!accessToken) return;
    
    setSubmitting(true);
    // Await successful deletion response
    if (await deleteAccount(deleteClips, accessToken, dispatch)) {
      setSubmitting(false);
      // Sign out of google
      signOut();
      // Await deletion of refresh token cookie
      if (await logout()) {
        // Delete access token
        dispatch(clearAccessToken());
        // Navigate home
        history.push(Path.HOME);
      }
    } 
  }

  if(!accessToken) return (
    <Container maxWidth='md'>
      <NavbarSpacer />
      <Paper className={ classes.paper }>
        <Typography variant='h5'>Not logged in</Typography>
      </Paper>
    </Container>
  );

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
          <div className={ classes.submitWrapper }>
            <Button variant='contained' onClick={ handleDelete } disabled={ !confirm || submitting } color='secondary'>Delete Account</Button>
            { submitting && <CircularProgress className={ classes.progress } size={ 24 }/> }
          </div>
        </DialogActions>
      </Dialog>
      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h5'>Account</Typography>
        <Button
          variant='outlined'
          size='small'
          onClick={ () => props.setShowUsernameDialog(true) }
          color='default'>
            Change username
          </Button>
      </Paper>

      <Paper className={ classes.paper }>
        <Typography className={ classes.heading } variant='h6'>Manage Account</Typography>
        <Button variant='outlined' size='small' onClick={ toggleOpen } color='secondary'>Delete my Account</Button>
      </Paper>
    </Container>
  )
}