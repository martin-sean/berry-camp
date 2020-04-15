import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Chapter, Side } from '../../api/ChapterTree';
import ItemSide from './ItemSide';

const useStyles = makeStyles((theme) => ({
  spacing: {
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default (props: { chapter: Chapter }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  }

  const chapterTitle = props.chapter.chapter_no ? 
    'Chp ' + props.chapter.chapter_no + ': ' + props.chapter.name : 
    props.chapter.name

  return (
    <React.Fragment>
      <ListItem button className={ classes.spacing } onClick={ handleClick }>
        <ListItemText primary={ chapterTitle } />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            props.chapter.sides.map((side: Side, index: number) => (
              <ItemSide side={ side } key={ index } />
            ))
          }
        </List>
      </Collapse>
    </React.Fragment>
  );
}