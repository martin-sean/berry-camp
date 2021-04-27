import React, { useState, useCallback } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, makeStyles, debounce, CircularProgress } from '@material-ui/core';
import { Check as CheckIcon, ErrorOutline as ErrorIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setNewUsername, validateUsername } from 'fetch/user';
import { setAccessToken } from 'redux/actions';

const usernamePattern = new RegExp('^\\w+$');

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(1.85),
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

interface RegistrationProps {
  accessToken: string,
  requiresUsername: boolean,
  setShowUsernameDialog: (open: boolean) => void,
}

export default (props: RegistrationProps) => {
  const classes = useStyles();
  const [error, setError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Store a valid username to submit
  const [username, setUsername] = useState<string | null>(null);
  // Submitting status
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Grab the username form the event and debouce checking validity
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reset all values
    setErrorMessage(null);
    setUsername(null);
    setError(null);
    event.persist();
    onUsernameChange(event.target.value.toLowerCase());
  }

  // Debounce the username check to to every 500ms, useCallback to persist function during rerenders 
  const onUsernameChange = useCallback(debounce(async (username: string) => {
    const valid = usernamePattern.test(username) && username.length >= 3;

    // If valid, check if the username is available
    if (valid) {
      try {
        const available = await validateUsername(username, props.accessToken, dispatch);
        setError(!available);
        setErrorMessage(`'${ username }' ${ available ? 'is available' : 'is already taken' }`);
        // Save for submission if available
        if (available) setUsername(username);
      } catch (error) {
        setError(true);
        setErrorMessage("Could not validate username. Please contact the Admin.")
      }
    // Message isn't valid, immediately set message  
    } else {
      setError(true);
      setErrorMessage('Username has errors');
    }
  }, 1000), []);

  // Submit the new username
  const handleSubmit = async () => {
    // Username must be present
    if (!username) return;
    setSubmitting(true);
    const newAccessToken = await setNewUsername(username, props.accessToken, dispatch);
    setSubmitting(false);
    newAccessToken && dispatch(setAccessToken(newAccessToken));
    props.setShowUsernameDialog(false);
  }

  return (
    <React.Fragment>
      <Dialog open={ true }>
        <DialogTitle>Enter a username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A username must be between 3-20 characters, can only contain letters, numbers and underscores and is not case sensitive.
          </DialogContentText>
          <div className={ classes.form }>
            <TextField
              required
              autoFocus
              autoComplete='off'
              variant='outlined'
              margin='dense'
              id='username'
              label='Username'
              type='text'
              onChange={ handleChange }
              error={ error || false }
              helperText={ errorMessage }
              inputProps={{
                maxLength: 20,
                pattern: usernamePattern,
              }}
            />
            {/* If error is null, dont render anything */}
            { error === true ? (
              <ErrorIcon className={ classes.icon } color='secondary'/>
            ) : error === false && (
              <CheckIcon className={ classes.icon } color='primary'/>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={ () => props.setShowUsernameDialog(false) }
            disabled={ props.requiresUsername }
            color='default'>
              Cancel
          </Button>
          <div className={ classes.submitWrapper }>
            <Button disabled={ submitting || !username } variant='contained' onClick={ handleSubmit } color='primary'>Submit</Button>
            { submitting && <CircularProgress className={ classes.progress } size={ 24 }/> }
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}