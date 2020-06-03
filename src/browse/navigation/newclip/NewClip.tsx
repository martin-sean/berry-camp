import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button, TextField, makeStyles, Chip } from '@material-ui/core';
// import { useSelector } from 'react-redux';
// import { GlobalStore } from 'redux/reducers';
import VideoPicker from './VideoPicker';

const useStyles = makeStyles((theme) => ({
  // fullWidthInput: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1),
  // },
  // halfWidthInput: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  // },
  tagsWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagInputRoot: {
    padding: 0,
    margin: 0,
  },
  tagInput: {
    // flex: 1,
  },
  tagChip: {
    margin: theme.spacing(0.5),
  },
}));

interface NewClipProps {
  open: boolean,
  setOpen: (open: boolean) => void,
}

export default (props: NewClipProps) => {
  const classes = useStyles();

  // const nav = useSelector((store: GlobalStore) => store.nav);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  interface FormData {
    name: string,
    description: string,
    videoId: string,
    tags: string[],
  }

  // Use form for field array
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const { register, setValue, handleSubmit, watch, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: Record<string, any>) => {
    console.log(JSON.stringify(data));
  }

  const tagAppend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && event.target instanceof HTMLInputElement && event.target.value !== '') {
      append({ tag: event.target.value });
      event.target.value = '';
    }
  }

  // If the input matches a youtube link, try to format it
  const handleVideoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoInput = event.currentTarget.value;
    
    let videoId: string | null = null;
    let startTime: number | null = null;
    let endTime: number | null = null;

    // Handle Embedded link
    if (videoInput.match(/youtube.com\/embed/)) {
      // Video id
      let matches = videoInput.match(/embed\/(\w+)/);
      videoId = matches && matches[1];
      // Start
      matches = videoInput.match(/start=(\d+)/);
      startTime = matches && parseInt(matches[1]);
      // End
      matches = videoInput.match(/end=(\d+)/);
      endTime = matches && parseInt(matches[1]);
    // Handle normal link
    } else if (videoInput.match(/youtube.com/)) {
       // Video id
      let matches = videoInput.match(/v=(\w+)/)
      videoId = matches && matches[1];
      // Start
      matches = videoInput.match(/t=(\d+)/);
      startTime = matches && parseInt(matches[1]);
    // Handle short link
    } else if (videoInput.match(/youtu.be/)) {
      // Video id
      let matches = videoInput.match(/youtu.be\/(\w+)/)
      videoId = matches && matches[1];
      // Start
      matches = videoInput.match(/t=(\d+)/);
      startTime = matches && parseInt(matches[1]);
    }

    // Set values if they exists
    videoId && setValue('videoId', videoId, true);
    startTime && setStartTime(startTime);
    endTime && setEndTime(endTime);
  }

  const setTimes = (startTime: number, endTime: number) => {
    setStartTime(startTime);
    setEndTime(endTime);
  }

  // Watch the current start and end time
  const currentVideoId = watch('videoId');

  return (
    <React.Fragment>
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
            { currentVideoId && currentVideoId.length === 11 && startTime ? (
              <VideoPicker videoId={ currentVideoId } startTime={ startTime } setTimes={ setTimes }/>
            ) : currentVideoId && currentVideoId.length === 11 && (
              <VideoPicker videoId={ currentVideoId } setTimes={ setTimes }/>
            )}

            <div className={ classes.tagsWrapper }>
              {fields.map((field, index) => (
                <Controller
                  className={ classes.tagChip }
                  key={ field.id }
                  control={ control }
                  name={`tags[${index}].tag`}
                  as={ Chip }
                  onDelete={ () => remove(index) }
                  label={ field.tag }
                  defaultValue={ field.tag }
                />
              ))}
              {/* Tags */}
              <TextField
                className={ classes.tagInput }
                autoComplete='off'
                placeholder='Press enter to add tags'
                type='text'
                onKeyDown={ tagAppend }
                InputProps={{
                  disableUnderline: true,
                }}
                size='small'
                margin='normal'
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='secondary'
              onClick={ () => props.setOpen(false) }
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
            >
              Create Clip
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}