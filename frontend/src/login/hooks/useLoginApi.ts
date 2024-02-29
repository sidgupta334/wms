import useMutation from 'common/hooks/useMutation';
import useRouter from 'common/hooks/useRouter';
import useSession from 'common/hooks/useSession';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import axios from 'common/utils/axios';

const login = axios('auth/login');

const loginApi = (data: any) => {
  return login.post('', data);
};

const useLoginApi = () => {
  const { redirectToRoute } = useRouter();
  const { startSession } = useSession(false);

  return useMutation(loginApi, {
    showSuccessSnackbar: true,
    onSuccess: (data) => {
      const token = data.token;
      delete data.token;
      startSession(data, token);
      redirectToRoute(AppRoutesEnum.HOME, {});
    },
  });
};

export default useLoginApi;
