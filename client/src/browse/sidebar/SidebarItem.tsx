import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { MenuItem } from './Sidebar';

interface SidebarItemProps {
  item: MenuItem;
  indent: number;
}

// Calculate the padding based on nesting level
const useStyles = makeStyles<Theme, SidebarItemProps>((theme: Theme) => ({
  item: {
    paddingLeft: props => theme.spacing(props.indent * 2),
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
  },
  primary: {
    padding: '5px',
  },
  secondary: {
    padding: '5px',
    fontSize: '14px',
  },
}));

// Render a sidebar item as a dropdown or single item
const SidebarItem = (props: { item: MenuItem, indent: number }) => {
  return (
    props.item.children ? 
      <DropdownItem item={ props.item } indent={ props.indent + 1 } /> 
    : 
      <RoomItem item={ props.item } indent={ props.indent + 1 } />
  );
}

// Render an item with children in a dropdown with state
const DropdownItem = (props: { item: MenuItem, indent: number }) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <React.Fragment>
      {
        // Render children directly to the current indentation if item has no name
        props.item.name ?
          <React.Fragment>
          <ListItem button className={ classes.item } onClick={ handleClick }>
            <ListItemText secondary={ props.item.name } />
            { open ? <ExpandLess /> : <ExpandMore /> }
          </ListItem>
          <Collapse in={ open } timeout='auto' unmountOnExit>
            <RenderChildren item={ props.item } indent={ props.indent } />
          </Collapse>
          </React.Fragment>
        :
          <RenderChildren item={ props.item } indent={ props.indent - 1 } />
      }
    </React.Fragment>
  );
}

// Render the children of an item as a List
const RenderChildren = (props: { item: MenuItem, indent: number }) => {
  return (
    <List component='div' disablePadding>
      {
        props.item.children && props.item.children.map((item: MenuItem, index: number) => (
          <SidebarItem item={ item } key={ index } indent={ props.indent }/>
        ))
      }
    </List>
  );
}

// Render an item without children
const RoomItem = (props: { item: MenuItem, indent: number }) => {
  const classes = useStyles(props);
  
  const handleClick = () => {
    // TODO: Navigate to room route
  }

  return(
    <ListItem button className={ classes.item } onClick={ handleClick }>
      <Typography className={ classes.seconary } component="div" color="textSecondary">{ props.item.debug_id } - </Typography>
      <Typography className={ classes.primary } component="div">{ props.item.name }</Typography>
      {/* <ListItemText primary={ props.item.name } secondary={ props.item.debug_id }/> */}
    </ListItem>
  );
}

export default SidebarItem;