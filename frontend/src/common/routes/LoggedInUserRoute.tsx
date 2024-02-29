import useSession from 'common/hooks/useSession';
import { GuardRouteProps } from './Route.type';
import PageLoader from 'common/components/loaders/PageLoader';
import { Navigate } from 'react-router-dom';
import { AppRoutesEnum } from './AppRoutes.enum';

const LoggedInUserRoute: React.FC<GuardRouteProps> = ({ element }) => {
  const { isLoading, hasValidSession } = useSession();
  if (isLoading) {
    return <PageLoader />;
  }

  if (!hasValidSession) {
    return <Navigate to={AppRoutesEnum.LOGIN} />;
  }
  return element;
};

export default LoggedInUserRoute;
