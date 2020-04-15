import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Checkpoint, Room } from '../../api/ChapterTree';

const useStyles = makeStyles((theme) => ({
  spacing: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default (props: { checkpoint: Checkpoint }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <ListItem button className={ classes.spacing } onClick={ handleClick }>
        <ListItemText primary={ props.checkpoint.name } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            props.checkpoint.rooms.map((room: Room, index: number) => (
              <ListItem button className={ classes.spacing } key={ index }>
                <ListItemText primary={ room.debug_id } />
              </ListItem>
            ))
          }
        </List>
      </Collapse>
    </React.Fragment>
  );
}