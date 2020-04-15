import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Side, Checkpoint } from '../../api/ChapterTree';
import ItemCheckpoint from './ItemCheckpoint';

const useStyles = makeStyles((theme) => ({
  spacing: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default (props: { side: Side }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  if (props.side.name) {
    return (
      <React.Fragment>
        <ListItem button className={ classes.spacing } onClick={ handleClick }>
          <ListItemText primary={ props.side.name } />
          { open ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>
        <Collapse in={ open } timeout='auto' unmountOnExit>
          <Checkpoints side={ props.side } />
        </Collapse>
      </React.Fragment>
    );
  } else {
    return (
      <Checkpoints side={ props.side } />
    );
  }
}

const Checkpoints = (props: { side: Side }) => {
  return (
    <List component='div' disablePadding>
      {
        props.side.checkpoints.map((checkpoint: Checkpoint, index: number) => (
          <ItemCheckpoint checkpoint={ checkpoint } key={ index } />
        ))
      }
    </List>
  );
}