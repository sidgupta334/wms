import useSession from 'common/hooks/useSession';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import useRouter from './useRouter';

const useLogoutApi = () => {
  const { redirectToRoute } = useRouter();
  const { clearSession } = useSession(false);

  const logoutUser = () => {
    clearSession();
    redirectToRoute(AppRoutesEnum.HOME);
  };

  return {
    logoutUser,
  };
};

export default useLogoutApi;
