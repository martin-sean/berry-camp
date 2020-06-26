import React, { useState } from 'react';
import { Autocomplete, AutocompleteChangeReason } from '@material-ui/lab';
import { TextField, Checkbox, makeStyles } from '@material-ui/core';
import { CheckBox as CheckboxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  checkbox: {
    marginRight: 8,
  }
}));

interface TagSelectorProps {
  tags: string[],
  setTags: (tags: string[]) => void,
}

const options: string[] = [
  'golden',
  'speedrun',
  'casual',
  'meme',
  'dashless',
  'demodash',
  'bubs drop',
  'neutral jump',
  'ultra',
  'wavedash',
  'hyper',
  'super',
  'wall bounce',
  'dash jump',
  'reverse super',
  'cornerboost',
  'zipper',
  'dream block',
  'dream hyper',
  'badeline',
  'madeline',
  'theo',
  'granny',
  'oshiro',
  'bird',
  'dust bunny',
  'kevin',
  'wind',
  'snowball',
  'feather',
  'platform',
  'bubble',
  'key skip',
  'door skip',
  'search skip',
  'bumper',
  'jelly',
  'jellyvator',
  'crystal heart',
  'cassette',
  'death',
  'ice skip',
  'conveyor',
  'switch',
  'coffee jump',
  'fish',
  'pink crystal',
  'key',
  'cloud',
  'seeker'
];


/**
 * Render a tags selector
 */
export default (props: TagSelectorProps) => {
  const classes = useStyles();
  
  // Tag field error message
  const [tagError, setTagError] = useState<string>();
  const maxTagsReached = props.tags.length >= 12

  // Handle changes to the Autocomplete value
  const handleAutocompleteChange = (event: React.ChangeEvent<any>, newTags: string[], reason: AutocompleteChangeReason) => {
    // Don't add new options if tag limit has been reached
    if (maxTagsReached && reason === 'select-option') return;

    // Clear any tag errors
    setTagError('');
    // Modify newly created tag
    if (reason === 'create-option' && props.tags.length) {
      newTags[newTags.length - 1] = newTags[newTags.length - 1].trim().toLowerCase();
    }
    // Set new tags
    props.setTags(newTags);
  }

  // Prevent wrong values from being added
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.target as HTMLInputElement;
    // Capture enter key presses
    if (event.keyCode === 13) {
      // Trim first for leading/trailing space flexibility
      input.value = input.value.trim().toLowerCase();
      // Limit number of tags
      if (maxTagsReached) {
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

  return (
    /* Tags. Hacky but it works */
    <Autocomplete
      multiple
      freeSolo
      autoComplete
      value={ props.tags }
      options={ options }
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
          disabled={ maxTagsReached }
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
            disabled={ maxTagsReached }
            color='default'
          />
          { option }
        </React.Fragment>
      )}
    />
  )
}