import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { MenuItem } from './Sidebar';

interface SidebarItemProps {
  item: MenuItem;
  indent: number;
}

// Calculate the padding based on nesting level
const useStyles = makeStyles<Theme, SidebarItemProps>((theme: Theme) => ({
  indent: {
    paddingLeft: props => theme.spacing(props.indent * 2),
    backgroundColor: theme.palette.background.paper,
  },
}));

// Render items with children in dropdowns with state
const SidebarItem = (props: { item: MenuItem, indent: number }) => {
  return (
    props.item.children ? 
      <DropdownItem item={ props.item } indent={ ++props.indent } /> 
    : 
      <RoomItem item={ props.item } indent={ ++props.indent } />
  );
}

// Render an item with children
const DropdownItem = (props: { item: MenuItem, indent: number }) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <ListItem button className={ classes.indent } onClick={ handleClick }>
        <ListItemText primary={ 'Chapter ' + props.item.chapter_no } secondary={ props.item.name }/>
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        {
          props.item.children && props.item.children.map((item: MenuItem, index: number) => (
            <SidebarItem item={ item } key={ index } indent={ props.indent }/>
          ))
        }
      </List>
      </Collapse>
    </React.Fragment>
  );
}

// Render an item without children
const RoomItem = (props: { item: MenuItem, indent: number }) => {
  const classes = useStyles(props);
  
  const handleClick = () => {
    // TODO: Navigate to room route
  }

  return(
    <ListItem button className={ classes.indent } onClick={ handleClick }>
      <ListItemText primary={ 'Nickname' } secondary={ props.item.debug_id }/>
    </ListItem>
  );
}

export default SidebarItem;