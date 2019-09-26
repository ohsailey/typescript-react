import React from 'react';
import { HashRouter, Route, RouteComponentProps } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PrivateHome from '../components/day13/PrivateHome/PrivateHome';
import Home from '../components/Home/Home';
import Header from '../components/Header/Header';

interface RouteWithSubRoutesPropsI {
  route: RouteI;
}

export function RouteWithSubRoutes(props: RouteWithSubRoutesPropsI): JSX.Element {
  const { route } = props;

  return (
    route.isPrivate
      ? (
        <PrivateRoute path="/privateHome" component={PrivateHome} />
      )
      : (
        <Route
          path={route.path}
          render={(renderProps): JSX.Element => (
            <route.Component routeComponentProps={renderProps} routes={route.routes} />
          )}
        />
      )
  );
}

export interface RouteComponentPropsI {
  routeComponentProps: RouteComponentProps;
  routes?: RouteI[];
}

interface RouteI {
  path: string;
  Component: (props: RouteComponentPropsI) => JSX.Element;
  breadcrumbName: string;
  routes?: RouteI[];
  isPrivate?: boolean;
}

export const routes: RouteI[] = [
  {
    path: '/',
    Component: Home,
    breadcrumbName: '首頁',
    routes: [
      {
        path: '/privateHome',
        Component: PrivateHome,
        breadcrumbName: 'PrivateHome',
        isPrivate: true,
      },
    ],
  },
];

export default function Router(): JSX.Element {
  return (
    <HashRouter>
      <div>
        <Header />

        {routes.map((route): JSX.Element => (
          <React.Fragment key={route.path}>
            <RouteWithSubRoutes route={route} />
          </React.Fragment>
        ))}
      </div>
    </HashRouter>
  );
}
