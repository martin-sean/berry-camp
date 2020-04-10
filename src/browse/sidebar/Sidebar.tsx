import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListSubheader } from '@material-ui/core';
import SideBarLevel from './SidebarLevel';

export interface Level {
  name: string,
  sides: Side[],
}

export interface Side {
  name: string,
  rooms: string[],
}

const levels: Level[] = [
  {
    name: 'Chapter 7',
    sides: [
      {
        name: 'A side',
        rooms: [
          "0m",
          "500m",
          "1000m",
          "1500m",
          "2000m",
          "2500m",
          "3000m",
        ],
      },
    ],
  },
  {
    name: 'Chapter 9',
    sides: [
      {
        name: 'A side',
        rooms: [
          "Start",
          "Singular",
          "Power Source",
          "Remembered",
          "Event Horizon",
          "Determination",
          "Stubbornness",
          "Reconcilliation",
          "Farewell",
          "Golden Room",
        ],
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <List
      className={ classes.root }
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Chapters
        </ListSubheader>
      }
    >
      {
        levels.map((level) => (
          <SideBarLevel level={ level } />
        ))
      }
    </List>
  );
}