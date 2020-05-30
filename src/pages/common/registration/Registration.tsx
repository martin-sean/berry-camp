import React, { useState, useCallback } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, makeStyles, debounce } from '@material-ui/core';
import { Check as CheckIcon, ErrorOutline as ErrorIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { SetAccessTokenAction, setAccessToken } from 'redux/actions';

const usernamePattern = new RegExp('^\\w+$');

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(1.85),
  }
}));

interface RegistrationProps {
  accessToken: string,
}

export default (props: RegistrationProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Store a valid username to submit
  const [username, setUsername] = useState<string | null>(null);
 
  const dispatch = useDispatch();

  // Issue a new access token when the username is updated
  const issueNewAccessToken = (accessToken: string) => {
    dispatch<SetAccessTokenAction>(setAccessToken(accessToken));
  }

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
  const onUsernameChange = useCallback(debounce((username: string) => {
    const valid = usernamePattern.test(username);

    // If valid, check if the username is available
    if (valid) {
      fetch(`/v1/auth/checkusername/${ username }`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(async (res) => {
        if (res.ok) {
          type AvailableResponse = { available: boolean };
          const { available } = await res.json() as AvailableResponse;
          setError(!available);
          setErrorMessage(`'${ username }' ${ available ? 'is available' : 'is already taken' }`);
          // Save the username for submission
          if (available) setUsername(username);
        } else {
          setError(true);
          setErrorMessage("Could not reach the server. Please contact the Admin.")
        }
      }); 
    // Message isn't valid, immediately set message  
    } else {
      setError(true);
      setErrorMessage('Username has errors');
    }
  }, 2000), []);

  // Submit the new username
  const handleSubmit = () => {
    console.log(username);
    fetch('/v1/user/current', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ props.accessToken }`
      },
      body: JSON.stringify({
        username: username,
      })
    }).then((res: any) => {
      // Check if response is ok
      if (res.ok) {
        return res.text();
      }
    }).then((accessToken: string) => {
      // Check if access token text exists in response
      if (accessToken) {
        // Close the modal
        setOpen(false);
        issueNewAccessToken(accessToken);
      }
    });
  }

  return (
    <React.Fragment>
      <Dialog open={ open }>
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
          <Button disabled={ !username } variant='contained' onClick={ handleSubmit }>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}