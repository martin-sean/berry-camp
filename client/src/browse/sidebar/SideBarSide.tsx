import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Side } from './Sidebar';

const useStyles = makeStyles((theme) => ({
  side: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  room: {
    paddingLeft: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
  }
}));

export default (props: { side: Side }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <ListItem button className={ classes.side } onClick={ handleClick }>
        <ListItemText primary={ props.side.name } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            props.side.rooms.map((room, index) => (
              <ListItem button className={ classes.room } key={ index }>
                <ListItemText primary={ room } />
              </ListItem>
            ))
          }
        </List>
      </Collapse>
    </React.Fragment>
  );
}