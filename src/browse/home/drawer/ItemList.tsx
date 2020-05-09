import React, { useRef, useLayoutEffect } from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography, RootRef } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';

import { GlobalStore, CurrentRoom } from '../../../redux/reducers';
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
  const data = useSelector((store: GlobalStore) => store.data);
  // Current navigation
  const nav = useSelector((store: GlobalStore) => store.nav);

  const setTitle = props.setTitle;

  // Breadcrumb actions - a state manager might be nice right about now...
  const clearNav = () => {
    dispatch<ClearNavAction>({ type: CLEAR_NAV });
  }

  const setNavChapter = (chapterId: string) => {
    dispatch<SetNavAction>({ type: SET_NAV, nav: { chapterId: chapterId } });
  }

  const setNavSide = (chapterId: string, sideNo: string) => {
    dispatch<SetNavAction>({ type: SET_NAV, nav: { chapterId: chapterId, sideNo: sideNo } });
  }

  const setNavCheckpoint = (chapterId: string, sideNo: string, checkpointNo: string) => {
    dispatch<SetNavAction>({ type: SET_NAV, nav: { chapterId: chapterId, sideNo: sideNo, checkpointNo: checkpointNo } });
  }

  const setRoom = (room: CurrentRoom) => {
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
              handleClick={ () => setNavChapter(chapterId) }
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
              <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ clearNav }>Chapter</Link> 
              <Typography color="textPrimary">Side</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { !chapter ? errorMessage("Sides") :
            Object.keys(chapter.sides).map((sideNo: string, index: number) => (
            <Item 
              primary={ chapter.sides[sideNo].name }
              before={ sideNo }
              handleClick={ () => setNavSide(props.chapterId, sideNo) }
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
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ clearNav }>Chapter</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => setNavChapter(props.chapterId) }>Side</Link>
            <Typography color="textPrimary">Checkpoint</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { !side ? errorMessage("Checkpoints") :
          Object.keys(side.checkpoints).map((checkpointNo: string, index: number) => (
            <Item
              primary={ side.checkpoints[checkpointNo].name }
              handleClick={ () => setNavCheckpoint(props.chapterId, props.sideNo, checkpointNo) }
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
    const currentRoom = useSelector((store: GlobalStore) => store.room);
    // Check if chapter side and checkpoint match the current room
    const current = 
      currentRoom?.chapterId === props.chapterId &&
      currentRoom?.sideNo === props.sideNo &&
      currentRoom?.checkpointNo === props.checkpointNo;

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ clearNav }>Chapter</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => setNavChapter(props.chapterId) }>Side</Link>
            <Link component='button' className={ classes.breadcrumbLink } color="textSecondary" onClick={ () => setNavSide(props.chapterId, props.sideNo) }>Checkpoint</Link>
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
    const currentRef = useRef<HTMLElement>(null);

    // Scroll the page to selected item
    useLayoutEffect(() => {
      if (props.selected) {
        currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    return (
      <RootRef rootRef={ currentRef }>
        <ListItem
          button
          onClick={ props.handleClick }
          selected={ props.selected }
        > 
          <Typography className={ classes.indent } color="textSecondary">{ props.before }</Typography>
          <ListItemText primary={ props.primary } secondary={ props.secondary } />
        </ListItem>
      </RootRef>
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
        nav && nav.checkpointNo && nav.sideNo && nav.chapterId ?
          <RoomList chapterId={ nav.chapterId } sideNo={ nav.sideNo } checkpointNo={ nav.checkpointNo } closeDrawer={ props.closeDrawer } 
          />
        : nav && nav.sideNo && nav.chapterId ?
          <CheckpointList chapterId={ nav.chapterId } sideNo={ nav.sideNo } />
        : nav && nav.chapterId ?
          <SideList chapterId={ nav.chapterId } />
        :
          <ChapterList />
      }
    </List>
  );
}