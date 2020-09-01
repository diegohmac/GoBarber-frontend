import React from 'react';
import {
  RouteProps as ReactRouterDomProps,
  Route as ReactRouterDomRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactRouterDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/*
  is private/is autenthicated = OK
  is private/non authenticated = redirect login
  non private/is authenticated = redirect dashboard
  non private/non authenticated = OK
*/

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRouterDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
