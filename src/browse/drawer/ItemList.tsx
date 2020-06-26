import React, { useRef, useLayoutEffect } from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography, RootRef, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';

import { GlobalStore, NavActionProps } from 'redux/reducers';
import { setNav, clearNav } from 'redux/actions';
import { DataTree } from 'api/data';

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
  },
  listProgress: {
    justifyContent: 'center',
    height: 100,
    padding: theme.spacing(2),
  },
}));

interface ItemsListProps {
  closeDrawer: () => void, 
  setTitle: (title: string | undefined) => void,
}

// Populate the chapter tree drawer
export default (props: ItemsListProps) => {
  const classes = useStyles();

  // Redux stuff
  const data = useSelector((store: GlobalStore) => store.data);
  const nav = useSelector((store: GlobalStore) => store.nav);
  const dispatch = useDispatch();

  // Keep method out of props namespace for subcomponents
  const setTitle = props.setTitle;

  // Breadcrumb and item selection actions, manage the navigation and selected room in state
  const clearNavigation = () => {
    dispatch(clearNav());
  }

  // Set the navigation
  const setNavigation = (nav: NavActionProps) => {
    dispatch(setNav(nav));
  }

  interface ChapterListProps {
    data: DataTree,
  }

  const ChapterList = (props: ChapterListProps) => {
    setTitle('Chapters');

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Typography color="textPrimary">Chapter</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { Object.keys(props.data).map((chapterId: string, index: number) => (
            <Item
              data={ props.data }
              primary={ props.data[chapterId].name }
              handleClick={ () => setNavigation({ chapterId: chapterId }) }
              before={ props.data[chapterId].chapter_no }
              key={ index }
            />
          ))
        }
      </React.Fragment>
    );
  }

  interface SideListProps {
    data: DataTree,
    chapterId: string,
  }
  
  const SideList = (props: SideListProps) => {
    const chapter = props.data[props.chapterId];
    setTitle(chapter.name);

    return (
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link 
                component='button'
                className={ classes.breadcrumbLink }
                color="textSecondary" onClick={ clearNavigation }
              >
                Chapter
              </Link> 
              <Typography color="textPrimary">Side</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { !chapter ? errorMessage("Sides") :
            Object.keys(chapter.sides).map((sideNo: string, index: number) => (
            <Item
              data={ props.data }
              primary={ chapter.sides[sideNo].name }
              before={ sideNo }
              handleClick={ () => setNavigation({ chapterId: props.chapterId, sideNo: sideNo }) }
              key={ index }
            />
          ))}
        </React.Fragment> 
    );
  }

  interface CheckPointListProps {
    data: DataTree,
    chapterId: string,
    sideNo: string,
  }

  const CheckpointList = (props: CheckPointListProps) => {
    const chapter = props.data[props.chapterId];
    const side = chapter?.sides[props.sideNo];
    setTitle(side?.name);

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Link 
              component='button' 
              className={ classes.breadcrumbLink }
              color="textSecondary" 
              onClick={ clearNavigation }
            >
              Chapter
            </Link>
            <Link 
              component='button'
              className={ classes.breadcrumbLink }
              color="textSecondary"
              onClick={ () => setNavigation({ chapterId: props.chapterId }) }
            >
              Side
            </Link>
            <Typography color="textPrimary">Checkpoint</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { !side ? errorMessage("Checkpoints") :
          Object.keys(side.checkpoints).map((checkpointNo: string, index: number) => (
            <Item
              data={ props.data }
              primary={ side.checkpoints[checkpointNo].name }
              handleClick={ () => setNavigation({ chapterId: props.chapterId, sideNo: props.sideNo, checkpointNo: checkpointNo }) }
              before={ checkpointNo }
              key={ index }
            />
        ))}
      </React.Fragment>
    );
  }

  interface RoomListProps {
    data: DataTree,
    chapterId: string,
    sideNo: string,
    checkpointNo: string,
    closeDrawer: () => void, 
  }

  const RoomList = (props: RoomListProps) => {
    const chapter = props.data[props.chapterId];
    const side = chapter?.sides[props.sideNo];
    const checkpoint = side?.checkpoints[props.checkpointNo];
    setTitle(checkpoint?.name);

    return (
      <React.Fragment>
        <ListItem>
          <Breadcrumbs separator="›">
            <Link
              component='button'
              className={ classes.breadcrumbLink }
              color="textSecondary"
              onClick={ clearNavigation }
            >
              Chapter
            </Link>
            <Link 
              component='button'
              className={ classes.breadcrumbLink }
              color="textSecondary"
              onClick={ () => setNavigation({ chapterId: props.chapterId }) }
            >
              Side
            </Link>
            <Link 
              component='button'
              className={ classes.breadcrumbLink }
              color="textSecondary"
              onClick={ () => setNavigation({ chapterId: props.chapterId, sideNo: props.sideNo }) }
            >
              Checkpoint
            </Link>
            <Typography color="textPrimary">Room</Typography>
          </Breadcrumbs>
        </ListItem>
        <Divider />
        { !checkpoint ? errorMessage("Rooms") :
          Object.keys(checkpoint.rooms).map((roomNo: string, index: number) => (
            <Item
              data={ props.data }
              primary={ checkpoint.rooms[roomNo].name }
              secondary={ checkpoint.rooms[roomNo].debug_id }
              before={ roomNo }
              selected={ roomNo === nav.roomNo }
              handleClick={ () => { 
                props.closeDrawer();
                setNavigation({ 
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
    data: DataTree,
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
        currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
      {/* Render progress until data is loaded */}
      { data ? (
        <React.Fragment>
          {/* Handle naviation position and render required list */}
          { nav.checkpointNo && nav.sideNo && nav.chapterId ? (
            <RoomList data={ data } chapterId={ nav.chapterId } sideNo={ nav.sideNo } checkpointNo={ nav.checkpointNo } closeDrawer={ props.closeDrawer }/>
          ) : nav.sideNo && nav.chapterId ? (
            <CheckpointList data={ data } chapterId={ nav.chapterId } sideNo={ nav.sideNo }/>
          ) : nav.chapterId ? (
            <SideList data={ data } chapterId={ nav.chapterId }/>
          ) : (
            <ChapterList data={ data }/>
          )}
        </React.Fragment>
        ) : (
          <ListItem className={ classes.listProgress }>
            <CircularProgress size={ 50 } />
          </ListItem>
        )
      }
    </List>
  );
}