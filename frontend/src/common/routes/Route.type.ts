import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';

export type GuardRouteProps = RouteProps & {
  element: ReactElement;
};
