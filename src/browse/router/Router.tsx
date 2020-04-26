import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Room from '../room';
import { DataTree } from '../../api/Data';

export const Paths = {
  HOME: '/',
  CHAPTER: '/chpt/:chapterId',
  SIDE: '/chpt/:chapterId/side/:sideNo',
  CHECKPOINT: '/chpt/:chapterId/side/:sideNo/ckpt/:checkpointNo',
  ROOM: '/chpt/:chapterId/side/:sideNo/ckpt/:checkpointNo/room/:roomNo',
}

export interface RoutePath {
  path: string,
  to: () => JSX.Element,
  // routes?: RoutePath[],
}



export default (props: { data: DataTree }) => {
  
  const routes: RoutePath[] = [
    {
      path: Paths.HOME,
      to: Home,
    },
    {
      path: Paths.ROOM,
      to: Room,
    },
  ]

  return (
    <Router>
      <Switch>
        {
          routes.map((route: RoutePath, index: number) => (
            <Route key={ index } path={ route.path }>
              <route.to />
            </Route>
          ))
        }
      </Switch>
    </Router>
  );
}