import React from 'react';
import { Breadcrumbs, Divider, List, ListItem, Link, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams, Route, Switch } from 'react-router-dom';

import { DataTree } from '../../api/Data';
import { Paths } from '../router';

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

// Populate the chapter tree drawer
export default (props: { data: DataTree, onItemSelect: () => void, setTitle: (title: string | undefined) => void}) => {
  const classes = useStyles();
  const chapters = props.data;
  const setTitle = props.setTitle;

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
            <React.Fragment>
              <Item
                primary={ chapters[chapterId].name }
                to={ `/chpt/${ chapterId }` }
                before={ <Typography className={ classes.indent } color="textSecondary">{ chapters[chapterId].chapter_no }</Typography> }
                key={ index }
              />
            </React.Fragment>
          ))
        }
      </React.Fragment>
    );
  }
  
  const SideList = () => {
    const { chapterId } = useParams();
    const chapter = chapterId ? props.data[chapterId] : undefined;
    setTitle(chapter?.name);

    return (
      !chapter ? errorMessage("Sides") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link> 
              <Typography color="textPrimary">Side</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(chapter.sides).map((sideNo: string, index: number) => (
            <Item 
              primary={ chapter.sides[sideNo].name }
              to={ `/chpt/${ chapterId }/side/${ sideNo }` }
              key={ index }
            />
          ))}
        </React.Fragment> 
    );
  }
  
  const CheckpointList = () => {
    const { chapterId, sideNo } = useParams();
    const chapter = chapterId ? props.data[chapterId] : undefined;
    const side = sideNo ? chapter?.sides[sideNo] : undefined;
    setTitle(side?.name);

    return (
      !side ? errorMessage("Checkpoints") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
              <Link color="textSecondary" component={ RouterLink } to={ `/chpt/${ chapterId }/`}>Side</Link>
              <Typography color="textPrimary">Checkpoint</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(side.checkpoints).map((checkpointNo: string, index: number) => (
              <Item 
                primary={ side.checkpoints[checkpointNo].name }
                to={ `/chpt/${ chapterId }/side/${ sideNo }/ckpt/${ checkpointNo }` }
                key={ index }
              />
          ))}
        </React.Fragment>
    );
  }
  
  const RoomList = (props: { data: DataTree, onClick: () => void }) => {
    const { chapterId, sideNo, checkpointNo } = useParams();
    const chapter = chapterId ? props.data[chapterId] : undefined;
    const side = sideNo ? chapter?.sides[sideNo] : undefined;
    const checkpoint = checkpointNo ? side?.checkpoints[checkpointNo] : undefined;
    setTitle(checkpoint?.name);

    return (
      !checkpoint ? errorMessage("Rooms") :
        <React.Fragment>
          <ListItem>
            <Breadcrumbs separator="›">
              <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
              <Link color="textSecondary" component={ RouterLink } to={ `/chpt/${ chapterId }/`}>Side</Link>
              <Link color="textSecondary" component={ RouterLink } to={ `/chpt/${ chapterId }/side/${ sideNo }/` }>Checkpoint</Link>
              <Typography color="textPrimary">Room</Typography>
            </Breadcrumbs>
          </ListItem>
          <Divider />
          { Object.keys(checkpoint.rooms).map((roomNo: string, index: number) => (
              <Item 
                primary={ checkpoint.rooms[roomNo].name }
                secondary={ checkpoint.rooms[roomNo].debug_id }
                to={ `/chpt/${ chapterId }/side/${ sideNo }/ckpt/${ checkpointNo }/room/${ roomNo }` }
                onClick={ props.onClick }
                key={ index }
              />
          ))}
        </React.Fragment>
    );
  }
  
  // Render an item in the list
  const Item = (props: { primary: string, secondary?: string, to: string, before?: JSX.Element, onClick?: () => void }) => {
    return (
      <ListItem button 
        component={ RouterLink }
        to={ props.to } 
        onClick={ props.onClick }
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
  )

  return (
    <List
      className={ classes.list }
      aria-labelledby='TODO'
    >
      {/* Render the items */}
      <Switch>
        <Route exact path={ Paths.HOME } component={ ChapterList }/>
        <Route exact path={ Paths.CHAPTER } component={ SideList }/>
        <Route exact path={ Paths.SIDE } component={ CheckpointList }/>
        <Route path={ Paths.CHECKPOINT } render={ () => <RoomList data={ props.data } onClick={ props.onItemSelect }/> }/>
      </Switch>
    </List>
  );
}