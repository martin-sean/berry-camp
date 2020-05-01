import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { DataTree } from '../../api/Data';
import { LastRoom, Navigation } from '../../App';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
  indent: {
    width: '30px',
  }
}));

interface ItemsListProps {
  nav: Navigation,
  setNavigation: (navigation: Navigation) => void,
  setLastRoom: (lastRoom: LastRoom) => void,
  data: DataTree, 
  closeDrawer: () => void, 
  setTitle: (title: string | undefined) => void,
}

// Populate the chapter tree drawer
export default (props: ItemsListProps) => {
  const classes = useStyles();
  const chapters = props.data;
  const setTitle = props.setTitle;

  // Breadcrumb actions - a state manager might be nice right about now...
  const selectChapter = () => {
    props.setNavigation({ chapterId: '', sideNo: '', checkpointNo: '' });
  }

  const selectSide = () => {
    props.setNavigation({ chapterId: props.nav.chapterId, sideNo: '', checkpointNo: '' });
  }

  const selectCheckpoint = () => {
    props.setNavigation({ chapterId: props.nav.chapterId, sideNo: props.nav.sideNo, checkpointNo: '' });
  }
  
  const setNavChapter = (chapterId: string) => {
    props.setNavigation({ chapterId: chapterId, sideNo: props.nav.sideNo, checkpointNo: props.nav.checkpointNo });
  }

  const setNavSide = (sideNo: string) => {
    props.setNavigation({ chapterId: props.nav.chapterId, sideNo: sideNo, checkpointNo: props.nav.checkpointNo });
  }

  const setNavCheckpoint = (checkpointNo: string) => {
    props.setNavigation({ chapterId: props.nav.chapterId, sideNo: props.nav.sideNo, checkpointNo: checkpointNo });
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
        { Object.keys(chapters).map((chapterId: string, index: number) => (
            <Item
              primary={ chapters[chapterId].name }
              handleClick={ () => setNavChapter(chapterId) }
              before={ <Typography className={ classes.indent } color="textSecondary">{ chapters[chapterId].chapter_no }</Typography> }
              key={ index }
            />
          ))
        }
      </React.Fragment>
    );
  }
  
  const SideList = () => {
    const chapter = props.nav.chapterId ? props.data[props.nav.chapterId] : undefined;
    setTitle(chapter?.name);

    return (
      !chapter ? errorMessage("Sides") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" onClick={ selectChapter }>Chapter</Link> 
              <Typography color="textPrimary">Side</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(chapter.sides).map((sideNo: string, index: number) => (
            <Item 
              primary={ chapter.sides[sideNo].name }
              handleClick={ () => setNavSide(sideNo) }
              key={ index }
            />
          ))}
        </React.Fragment> 
    );
  }

  const CheckpointList = () => {
    const chapter = props.nav.chapterId ? props.data[props.nav.chapterId] : undefined;
    const side = props.nav.sideNo ? chapter?.sides[props.nav.sideNo] : undefined;
    setTitle(side?.name);

    return (
      !side ? errorMessage("Checkpoints") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" onClick={ selectChapter }>Chapter</Link>
              <Link color="textSecondary" onClick={ selectSide }>Side</Link>
              <Typography color="textPrimary">Checkpoint</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(side.checkpoints).map((checkpointNo: string, index: number) => (
              <Item 
                primary={ side.checkpoints[checkpointNo].name }
                handleClick={ () => setNavCheckpoint(checkpointNo) }
                key={ index }
              />
          ))}
        </React.Fragment>
    );
  }

  const RoomList = () => {
    const chapter = props.nav.chapterId ? props.data[props.nav.chapterId] : undefined;
    const side = props.nav.sideNo ? chapter?.sides[props.nav.sideNo] : undefined;
    const checkpoint = props.nav.checkpointNo ? side?.checkpoints[props.nav.checkpointNo] : undefined;
    setTitle(checkpoint?.name);

    return (
      !checkpoint ? errorMessage("Rooms") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" onClick={ selectChapter }>Chapter</Link>
              <Link color="textSecondary" onClick={ selectSide }>Side</Link>
              <Link color="textSecondary" onClick={ selectCheckpoint }>Checkpoint</Link>
              <Typography color="textPrimary">Room</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(checkpoint.rooms).map((roomNo: string, index: number) => (
              <Item 
                primary={ checkpoint.rooms[roomNo].name }
                secondary={ checkpoint.rooms[roomNo].debug_id }
                handleClick={ () => { 
                  props.closeDrawer();
                  props.setLastRoom({ 
                    chapterId: props.nav.chapterId,
                    sideNo: props.nav.sideNo,
                    checkpointNo: props.nav.checkpointNo,
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
    before?: JSX.Element, 
    handleClick: () => void,
  }

  // Render an item in the list
  const Item = (props: ItemProps) => {
    return (
      <ListItem button 
        onClick={ props.handleClick }
      > 
        { props.before }
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
      className={ classes.list }
      aria-labelledby='TODO'
    >
      {
        props.nav.checkpointNo && props.nav.sideNo && props.nav.chapterId ?
          <RoomList />
        : props.nav.sideNo && props.nav.chapterId ?
        <CheckpointList />
        : props.nav.chapterId ?
          <SideList />
        :
          <ChapterList />
      }
    </List>
  );
}