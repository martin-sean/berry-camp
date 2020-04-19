import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Room from '../room';

export const Paths = {
  HOME: '/',
  ROOM: '/chapter/:id/side/:side_no/room/:room_no',
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