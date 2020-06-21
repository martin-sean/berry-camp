import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button, TextField, Snackbar, Slide, CircularProgress, Checkbox, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import VideoPicker from './VideoPicker';
import YTLinkParser from 'utils/yt-link-parser';
import { Autocomplete, AutocompleteChangeReason, Alert } from '@material-ui/lab';
import { createNewClip, NewClipData } from 'api/clip';
import { CheckBox as CheckboxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@material-ui/icons';

const TAG_LIMIT = 12;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  checkbox: {
    marginRight: 8,
  }
}));

interface NewClipProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  refreshClips: () => void,
}

export default (props: NewClipProps) => {
  const classes = useStyles();
  // Get the access token
  const accessToken = useSelector((store: GlobalStore) => store.accessToken)
  // Current room navigation
  const nav = useSelector((store: GlobalStore) => store.nav);
  // Selected video times
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  // Tag field error message
  const [tagError, setTagError] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  // Show the snackbar
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackSuccess, setSnackSuccess] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Redux action dispatch
  const dispatch = useDispatch();

  interface FormData {
    name: string,
    description: string,
    videoId: string,
  }

  const { register, setValue, handleSubmit, watch, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Handle changes to the Autocomplete value
  const handleAutocompleteChange = (event: React.ChangeEvent<any>, newTags: string[], reason: AutocompleteChangeReason) => {
    // Don't add new options if tag limit has been reached
    if (tags.length >= TAG_LIMIT && reason === 'select-option') return;

    // Clear any tag errors
    setTagError('');
    // Modify newly created tag
    if (reason === 'create-option' && tags.length) {
      newTags[newTags.length - 1] = newTags[newTags.length - 1].trim().toLowerCase();
    }
    // Set new tags
    setTags(newTags);
  }

  // Prevent wrong values from being added
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target as HTMLInputElement;
    // Capture enter key presses
    if (event.keyCode === 13) {
      // Trim first for leading/trailing space flexibility
      input.value = input.value.trim().toLowerCase();
      // Limit number of tags
      if (tags.length >= TAG_LIMIT) {
        event.preventDefault();
        event.stopPropagation();
        setTagError('Maximum number of tags reached');
      // Only allow single space separated words
      } else if (!input.value.match(/^([A-Za-z]+\s)*[A-Za-z]+$/)) {
        event.preventDefault();
        event.stopPropagation();
        setTagError('Can only contain words separated by single spaces');
      }
    }
  }

  // If the input is in a youtube link format, extract the values
  const handleVideoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoLink = event.currentTarget.value;
    const { videoId, startTime, endTime } = YTLinkParser(videoLink);
    // Set values if they exist
    videoId && setValue('videoId', videoId, true);
    startTime && setStartTime(startTime);
    endTime && setEndTime(endTime);
  }

  // Set the times when the user uses the video picker
  const setTimes = (startTime: number, endTime: number) => {
    setStartTime(startTime);
    setEndTime(endTime);
  }

  // Handle form submission
  const onSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    // Build the response object
    const submitData: NewClipData = {
      chapterId: nav.chapterId,
      sideNo: parseInt(nav.sideNo),
      checkpointNo: parseInt(nav.checkpointNo),
      roomNo: parseInt(nav.roomNo),
      ...(data.name && { name: data.name as string }),
      ...(data.description && { description: data.description as string }),
      videoId: data.videoId as string,
      startTime: startTime!,
      endTime: endTime!,
      tags,
    }
    // Check for successful clip creation
    if (await createNewClip(submitData, accessToken, dispatch)) {
      handleClose();
      setSnackSuccess(true);
      setSnackMessage("Clip submitted");
      props.refreshClips();
    // Error occured during clip creation
    } else {
      setSnackSuccess(false);
      setSnackMessage("An error occured submitting the clip")
    }
    setSnackOpen(true);
    setSubmitting(false);
  }

  // Handle button close
  const handleClose = () => {
    setSubmitting(false);
    setTags([]);
    setStartTime(null);
    setEndTime(null);
    props.setOpen(false);
  }

  // Watch the current start and end time
  const currentVideoId = watch('videoId');

  return (
    <React.Fragment>
      {/* Submission alert */}
      <Snackbar
        open={ snackOpen }
        onClose={ () => setSnackOpen(false) }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
        autoHideDuration={ 4000 }
        TransitionComponent={ Slide }
      >
        <Alert variant='filled' severity={ snackSuccess ? 'success' : 'error' }>{ snackMessage }</Alert>
      </Snackbar>
      {/* New clip dialog */}
      <Dialog
        open={ props.open }
        disableBackdropClick
        onClose={ () => props.setOpen(false) }
        aria-labelledby="new-clip-dialog-title"
        aria-describedby="new-clip-dialog-description"
      >
        <DialogTitle>
          Submit a new YouTube clip
        </DialogTitle>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <DialogContent>
            <DialogContentText>
              Submit a new clip for the current room. Try to keep the clip short and contained within the room (a few seconds before and after is fine).
            </DialogContentText>
            <TextField
              inputRef={ register({ maxLength: 32 }) }
              fullWidth
              variant='filled'
              autoComplete='off'
              label='Name (optional)'
              name='name'
              type='text'
              error={ !!errors.name }
              helperText={ errors.name?.message }
              inputProps={{
                maxLength: 32,
              }}
              margin='normal'
            />
            <TextField
              inputRef={ register({ maxLength: { value: 256, message: 'Description limit is 256 characters'} }) }
              fullWidth
              variant='filled'
              multiline
              rows={ 4 }
              rowsMax={ 4 }
              autoComplete='off'
              label='Description (optional)'
              name='description'
              type='text'
              error={ !!errors.description }
              helperText={ errors.description?.message }
              inputProps={{
                maxLength: 256,
              }}
            />
            <TextField
              inputRef={ register({
                required: { value: true, message: 'Video ID is required' },
                minLength: { value: 11, message: 'ID too short, must be 11 characters'},
                maxLength: { value: 11, message: 'ID too long, must be 11 characters'}
              })}
              fullWidth
              autoComplete='off'
              required
              label='YouTube Video ID (Paste YouTube Link)'
              name='videoId'
              type='text'
              error={ !!errors.videoId }
              helperText={ errors.videoId?.message }
              onChange={ handleVideoIdChange }
              margin='normal'
            />
            
            {/* Video picker */}
            { currentVideoId && currentVideoId.length === 11 && startTime ? (
              <VideoPicker videoId={ currentVideoId } startTime={ startTime } setTimes={ setTimes }/>
            ) : currentVideoId && currentVideoId.length === 11 && (
              <VideoPicker videoId={ currentVideoId } setTimes={ setTimes }/>
            )}

            {/* Tags. Hacky but it works */}
            <Autocomplete
              multiple
              freeSolo
              autoComplete
              value={ tags }
              options={ ['wavedash', 'golden', 'meme'] }
              onChange={ handleAutocompleteChange }
              renderInput={(params) =>
                <TextField
                  { ...params }
                  name='tag'
                  placeholder='Add tag'
                  size='small'
                  margin='normal'
                  error={ !!tagError }
                  helperText={ tagError }
                  disabled={ tags.length >= TAG_LIMIT }
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  inputProps={{
                    ...params.inputProps,
                    maxLength: 20,
                    onKeyDown: handleKeyDown,
                  }}
                />
              }
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={ <CheckBoxOutlineBlankIcon fontSize='small'/> }
                    checkedIcon={ <CheckboxIcon fontSize='small'/> }
                    className={ classes.checkbox }
                    checked={ selected }
                    disabled={ tags.length >= TAG_LIMIT }
                    color='default'
                  />
                  { option }
                </React.Fragment>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={ handleClose }
            >
              Cancel
            </Button>
            <div className={ classes.wrapper }>
              <Button
                // Disable if awaiting response or missing a start and end time 
                disabled={ submitting || startTime === null || endTime === null }
                type='submit'
                variant='contained'
                color='primary'
              >
                Create Clip
              </Button>
              { submitting && <CircularProgress size={ 24 } className={ classes.progress }/> }
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}