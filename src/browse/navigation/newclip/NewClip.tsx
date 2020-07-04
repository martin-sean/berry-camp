import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button,
  TextField, CircularProgress, makeStyles, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStore } from 'redux/reducers';
import VideoPicker from './VideoPicker';
import YTLinkParser from 'utils/yt-link-parser';
import { createNewClip, NewClipData, ClipData, editClip } from 'api/clip';
import TagSelector from './TagSelector';
import { setNotification } from 'redux/actions';
import Volume from 'pages/common/volume';

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
  content: {
    overflow: 'hidden',
  },
}));

interface NewClipProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  refreshClips: () => void,
  clipData?: ClipData, // Previous clip data provided = editing
}

export default (props: NewClipProps) => {
  const classes = useStyles();
  // Get the access token
  const accessToken = useSelector((store: GlobalStore) => store.accessToken)
  // Current room navigation
  const nav = useSelector((store: GlobalStore) => store.nav);
  // Selected video times and tags, load values if editing clip
  const [startTime, setStartTime] = useState<number | undefined>(props.clipData?.start_time);
  const [endTime, setEndTime] = useState<number | undefined>(props.clipData?.end_time);
  const [tags, setTags] = useState<string[]>(props.clipData?.tags.map(tag => tag.name) || []);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  interface FormData {
    name: string,
    description: string,
    videoId: string,
  }

  const { register, setValue, handleSubmit, watch, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // Load default values if editing clip
    defaultValues: {
      videoId: props.clipData?.video_id,
      name: props.clipData?.name,
      description: props.clipData?.description
    }
  });

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

  // Set the tags
  const setTagsCallback = useCallback((tags: string[]) => {
    setTags(tags);
  }, [setTags]);

  // Handle form submission
  const onSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    // Build the response object
    const submitData: NewClipData = {
      ...(!props.clipData && { chapterId: nav.chapterId }),
      ...(!props.clipData && { sideNo: parseInt(nav.sideNo) }),
      ...(!props.clipData && { checkpointNo: parseInt(nav.checkpointNo) }),
      ...(!props.clipData && { roomNo: parseInt(nav.roomNo) }),
      ...(data.name && { name: data.name as string }),
      ...(data.description && { description: data.description as string }),
      videoId: data.videoId as string,
      startTime: startTime!,
      endTime: endTime!,
      tags,
    }
    // Submit or edit clip
    props.clipData ? await handleEditClip(submitData) : await handleNewClip(submitData);
  }

  // Submit a new clip
  const handleNewClip = async (submitData: NewClipData) => {
    // Check for successful clip creation
    if (await createNewClip(submitData, dispatch, accessToken)) {
      dispatch(setNotification({
        show: true,
        message: 'Clip submitted',
        type: 'success',
        icon: 'none',
        duration: 2000
      }));
      props.setOpen(false);
      props.refreshClips();
    // Error occured during clip creation
    } else {
      dispatch(setNotification({
        show: true,
        message: "An error occured submitting the clip. Please try again",
        type: 'error',
        icon: 'none',
        duration: 4000 
      }));
    }
  }

  // Submit an existing edited clip
  const handleEditClip = async (submitData: NewClipData) => {
    // Don't bother updating if there is no clip data
    if (!props.clipData) return;

    // Determine if tags need updating
    let updateTags: boolean;
    // Update if the number of tags have changed
    if (props.clipData.tags.length !== submitData.tags.length) {
      updateTags = true;
    // Number of tags have not changed
    } else {
      // Get the common new and old tags. If the length is different, there are new tags 
      const commonTags = props.clipData.tags.filter(tag => submitData.tags.includes(tag.name));
      updateTags = commonTags.length !== props.clipData.tags.length || commonTags.length !== submitData.tags.length;
    }

    // Check for successful clip creation
    if (await editClip(props.clipData.id, submitData, accessToken, updateTags, dispatch)) {
      dispatch(setNotification({
        show: true,
        message: 'Clip updated',
        type: 'success',
        icon: 'none',
        duration: 2000
      }));
      props.setOpen(false);
      props.refreshClips();
    // Error occured during clip creation
    } else {
      dispatch(setNotification({ 
        show: true,
        message: "An error occured while updating the clip. Please try again",
        type: 'error',
        icon: 'none',
        duration: 4000
      }));
    }
  }

  // Watch the current start and end time
  const currentVideoId = watch('videoId');

  return (
    <React.Fragment>
      {/* New clip dialog */}
      <Dialog
        style={{ overflow: 'hidden' }}
        open={ props.open }
        disableBackdropClick
        onClose={ () => props.setOpen(false) }
        aria-labelledby="new-clip-dialog-title"
        aria-describedby="new-clip-dialog-description"
      >
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center' style={{ width: '100%' }}>
            { props.clipData ? 'Edit clip' : 'Submit a new YouTube clip' }
            <Volume showSlider={ false }/>
          </Box>
        </DialogTitle>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <DialogContent className={ classes.content }>
            <DialogContentText>
              { props.clipData ? 'Edit a' : 'Submit a new' } clip for the current room. Try to keep the clip short and contained within the one room (a few seconds before and after is fine).
            </DialogContentText>
            <TextField
              inputRef={ register({ maxLength: 64 }) }
              fullWidth
              variant='filled'
              autoComplete='off'
              label='Name (optional)'
              name='name'
              type='text'
              error={ !!errors.name }
              helperText={ errors.name?.message }
              inputProps={{
                maxLength: 64,
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
            { props.clipData ? (
              <VideoPicker videoId={ currentVideoId } startTime={ startTime } endTime={ endTime } setTimes={ setTimes }/>
            ) : currentVideoId && currentVideoId.length === 11 && startTime ? (
              <VideoPicker videoId={ currentVideoId } startTime={ startTime } setTimes={ setTimes }/>
            ) : currentVideoId && currentVideoId.length === 11 && (
              <VideoPicker videoId={ currentVideoId } setTimes={ setTimes }/>
            )}

            {/* Tags component */}
            <TagSelector tags={ tags } setTags={ setTagsCallback }/>

          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={ () => props.setOpen(false) }
            >
              Cancel
            </Button>
            <div className={ classes.wrapper }>
              <Button
                // Disable if awaiting response or missing a start and end time 
                disabled={ submitting || startTime === undefined || endTime === undefined }
                type='submit'
                variant='contained'
                color='primary'
              >
                { props.clipData ? 'Update Clip' : 'Create Clip' }
              </Button>
              { submitting && <CircularProgress size={ 24 } className={ classes.progress }/> }
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}