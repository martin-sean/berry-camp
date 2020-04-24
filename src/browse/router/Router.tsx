import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Room from '../room';

export const Paths = {
  HOME: '/',
  SIDES: '/chaptesr/:id/sides',
  CHECKPOINTS: '/chapters/:id/sides/:side_no/checkpoints',
  ROOMS: '/chapters/:id/sides/:side_no/checkpoints/:checkpoint_no/rooms',
  ROOM: '/chapters/:id/sides/:side_no/checkpoints/:checkpoint_no/rooms/:room_no',
}

export interface RoutePath {
  path: string,
  to: () => JSX.Element,
  routes?: RoutePath[],
}

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

export default () => {
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