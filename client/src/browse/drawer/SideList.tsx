import React from 'react';
import { Breadcrumbs, Divider, Link, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { DataTree } from '../../api/Data';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: 0,
  },
}));

export default (props: { data: DataTree }) => {
  const classes = useStyles();
  const { chapterId } = useParams();

  return (
    <List
      className={ classes.list }
      aria-labelledby='nested-list-subheader'
    >
      <ListItem>
        <Breadcrumbs separator="›">
          <Link color="textSecondary" component={ RouterLink } to={ '/' }>Chapter</Link>
          <Typography color="textPrimary">Side</Typography>
        </Breadcrumbs>
      </ListItem>
      <Divider />
      {
        chapterId ?
        Object.keys(props.data[chapterId].sides).map((sideNo: string, index: number) => (
          <ListItem button component={ RouterLink } to={ `/chapter/${chapterId}/side/${sideNo}` } key={ index }>
            <ListItemText primary={ props.data[chapterId].sides[sideNo].name }/>
          </ListItem>
        ))
        :
        <ListItem>
          <ListItemText primary="Error loading data" />
        </ListItem>
      }
    </List>
  );
}