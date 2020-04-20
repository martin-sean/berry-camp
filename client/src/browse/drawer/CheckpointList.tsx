import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { DataTree } from '../../api/Data';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
}));

export default (props: { data: DataTree }) => {
  const classes = useStyles();
  const { chapterId, sideNo } = useParams();

  if (!(chapterId && sideNo)) {
    return (
      <ListItem>
        <ListItemText primary="Error loading data" />
      </ListItem>
    );
  }
  
  const checkpoints = props.data[chapterId]?.sides[sideNo]?.checkpoints;

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Link color="textSecondary" component={ RouterLink } to={ `/chapter/${ chapterId }`}>Side</Link>
          <Typography color="textPrimary">Checkpoint</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        checkpoints ?
        Object.keys(checkpoints).map((checkpointNo: string, index: number) => (
            <ListItem button 
              component={ RouterLink } 
              to={ `/chapter/${ chapterId }/side/${ sideNo }/checkpoint/${ checkpointNo }` } 
              key={ index }
            >
              <ListItemText primary={ checkpoints[checkpointNo].name }/>
            </ListItem>
        ))
        :
        <ListItem>
          <ListItemText primary="Checkpoints not found" />
        </ListItem>
      }
    </List>
  );
}