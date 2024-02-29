import useSession from 'common/hooks/useSession';
import { GuardRouteProps } from './Route.type';
import PageLoader from 'common/components/loaders/PageLoader';
import { AppRoutesEnum } from './AppRoutes.enum';
import { Navigate } from 'react-router-dom';

const AdminRoute: React.FC<GuardRouteProps> = ({ element }) => {
  const { isLoading, hasValidSession, isAdmin } = useSession();
  if (isLoading) {
    return <PageLoader />;
  }

  if (!hasValidSession || !isAdmin) {
    return <Navigate to={AppRoutesEnum.HOME} />;
  }

  return element;
};

export default AdminRoute;
