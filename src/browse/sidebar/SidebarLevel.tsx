import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Level } from './Sidebar';
import SideBarSide from './SideBarSide'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default (props: { level: Level }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <ListItem button onClick={ handleClick }>
        <ListItemText primary={ props.level.name } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            props.level.sides.map((side) => (
              <SideBarSide side={ side } />
            ))
          }
        </List>
      </Collapse>
    </React.Fragment>
  );
}