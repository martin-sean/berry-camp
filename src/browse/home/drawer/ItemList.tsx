import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';

import { GlobalStore, LastRoom, Navigation } from '../../../redux/reducers';
import { SET_NAV, CLEAR_NAV, SET_ROOM } from '../../../redux/actionTypes';
import { SetNavAction, ClearNavAction, SetRoomAction } from '../../../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbLink: {
    display: 'flex',
    fontSize: '1rem',
    letterSpacing: 'inherit',
  },
  list: {
    overflowY: "auto",
    margin: 0,
    padding: 0,
    height: "100%",
    '&::-webkit-scrollbar': {
      width: '0.8em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: '1rem',
    }
  },
  indent: {
    width: '30px',
  }
}));

interface ItemsListProps {
  closeDrawer: () => void, 
  setTitle: (title: string | undefined) => void,
}

// Populate the chapter tree drawer
export default (props: ItemsListProps) => {
  const classes = useStyles();

  // Redux stuff
  const dispatch = useDispatch();
  // Current data
  const data = useSelector((state: GlobalStore) => state.data);
  // Current navigation
  const nav = useSelector((state: GlobalStore) => state.nav);

  const setTitle = props.setTitle;

  // Breadcrumb actions - a state manager might be nice right about now...
  const backToChapter = () => {
    dispatch<ClearNavAction>({ type: CLEAR_NAV });
  }

  const backToSide = (chapterId: string) => {
    dispatch<ClearNavAction>({ type: CLEAR_NAV, nav: { chapterId: chapterId } });
  }

  const backToCheckpoint = (chapterId: string, sideNo: string) => {
    dispatch<ClearNavAction>({ type: CLEAR_NAV, nav: { chapterId: chapterId, sideNo: sideNo } });
  }

  const setNavigation = (nav: Navigation) => {
    dispatch<SetNavAction>({ type: SET_NAV, nav: nav });
  }

  const setRoom = (room: LastRoom) => {
    dispatch<SetRoomAction>({ type: SET_ROOM, room: room });
  }

  const ChapterList = () => {
    setTitle('Chapters');

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Typography color="textPrimary">Chapter</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { Object.keys(data).map((chapterId: string, index: number) => (
            <Item
              primary={ data[chapterId].name }
              handleClick={ () => setNavigation({ chapterId: chapterId }) }
              before={ data[chapterId].chapter_no }
              key={ index }
            />
          ))
        }
      </React.Fragment>
    );
  }

  interface SideListProps {
    chapterId: string,
  }
  
  const SideList = (props: SideListProps) => {
    const chapter = data[props.chapterId];
    setTitle(chapter.name);

    return (
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ backToChapter }>Chapter</Link> 
              <Typography color="textPrimary">Side</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { !chapter ? errorMessage("Sides") :
            Object.keys(chapter.sides).map((sideNo: string, index: number) => (
            <Item 
              primary={ chapter.sides[sideNo].name }
              before={ sideNo }
              handleClick={ () => setNavigation({ sideNo: sideNo }) }
              key={ index }
            />
          ))}
        </React.Fragment> 
    );
  }

  interface CheckPointListProps {
    chapterId: string,
    sideNo: string,
  }

  const CheckpointList = (props: CheckPointListProps) => {
    const chapter = data[props.chapterId];
    const side = chapter?.sides[props.sideNo];
    setTitle(side?.name);

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ backToChapter }>Chapter</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => backToSide(props.chapterId) }>Side</Link>
            <Typography color="textPrimary">Checkpoint</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { !side ? errorMessage("Checkpoints") :
          Object.keys(side.checkpoints).map((checkpointNo: string, index: number) => (
            <Item
              primary={ side.checkpoints[checkpointNo].name }
              handleClick={ () => setNavigation({ checkpointNo: checkpointNo }) }
              before={ checkpointNo }
              key={ index }
            />
        ))}
      </React.Fragment>
    );
  }

  interface RoomListProps {
    chapterId: string,
    sideNo: string,
    checkpointNo: string,
    closeDrawer: () => void, 
  }

  const RoomList = (props: RoomListProps) => {
    const chapter = data[props.chapterId];
    const side = chapter?.sides[props.sideNo];
    const checkpoint = side?.checkpoints[props.checkpointNo];
    setTitle(checkpoint?.name);

    // Get the currently selected from redux
    const currentRoom = useSelector((state: GlobalStore) => state.room);
    // Check if chapter side and checkpoint match the current room
    const current = 
      currentRoom?.chapterId === props.chapterId &&
      currentRoom?.sideNo === props.sideNo &&
      currentRoom?.checkpointNo === props.checkpointNo;

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ backToChapter }>Chapter</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => backToSide(props.chapterId) }>Side</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => backToCheckpoint(props.chapterId, props.sideNo) }>Checkpoint</Link>
            <Typography color="textPrimary">Room</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { !checkpoint ? errorMessage("Rooms") :
          Object.keys(checkpoint.rooms).map((roomNo: string, index: number) => (
            <Item 
              primary={ checkpoint.rooms[roomNo].name }
              secondary={ checkpoint.rooms[roomNo].debug_id }
              before={ roomNo }
              selected={ roomNo === currentRoom?.roomNo && current }
              handleClick={ () => { 
                props.closeDrawer();
                setRoom({ 
                  chapterId: props.chapterId,
                  sideNo: props.sideNo,
                  checkpointNo: props.checkpointNo,
                  roomNo: roomNo,
                })
              }}
              key={ index }
            />
        ))}
      </React.Fragment>
    );
  }
  
  interface ItemProps {
    primary: string, 
    secondary?: string, 
    before: string | number | undefined,
    selected?: boolean
    handleClick: () => void,
  }

  // Render an item in the list
  const Item = (props: ItemProps) => {
    return (
      <ListItem
        button
        onClick={ props.handleClick }
        selected={ props.selected }
        autoFocus={ props.selected }
      > 
        <Typography className={ classes.indent } color="textSecondary">{ props.before }</Typography>
        <ListItemText primary={ props.primary } secondary={ props.secondary } />
      </ListItem>
    );
  }
  
  // Error message when resource is not found
  const errorMessage = (resource: string) => (
    <ListItem>
      <ListItemText primary={ resource + " not found" }/>
    </ListItem>
  );

  return (
    <List
      component='nav'
      className={ classes.list }
      aria-labelledby='TODO'
    >
      {
        nav.checkpointNo && nav.sideNo && nav.chapterId ?
          <RoomList chapterId={ nav.chapterId } sideNo={ nav.sideNo } checkpointNo={ nav.checkpointNo } closeDrawer={ props.closeDrawer } 
          />
        : nav.sideNo && nav.chapterId ?
          <CheckpointList chapterId={ nav.chapterId } sideNo={ nav.sideNo } />
        : nav.chapterId ?
          <SideList chapterId={ nav.chapterId } />
        :
          <ChapterList />
      }
    </List>
  );
}