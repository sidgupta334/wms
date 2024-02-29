import { useLoggedInProfile } from 'common/context/hooks/loggedInProfile';
import useLocalStorage from './useLocalStorage';
import queryClient from 'common/utils/QueryClient';
import useGetMyProfile from './useGetMyProfile';

const useSession = (allowRefetch = true) => {
  const { value: hasSession, setItemValue: setSession } = useLocalStorage('hasSession');
  const { setItemValue: setToken } = useLocalStorage('auth-token');
  const { loggedInProfile, setLoggedInProfile } = useLoggedInProfile();

  const {
    data: profile,
    refetch: refetchUserDetails,
    isLoading,
    isSuccess,
  } = useGetMyProfile({ enabled: !!hasSession && allowRefetch });

  const startSession = (data: any, token: any) => {
    setSession(true);
    setLoggedInProfile(data);
    setToken(token);
    refetchUserDetails();
  };

  const clearSession = () => {
    if (hasSession) {
      setSession(false);
      queryClient.clear();
      setToken(null);
      setLoggedInProfile(null);
    }
  };

  return {
    isLoading,
    hasValidSession: hasSession && isSuccess,
    hasProfile: !!profile,
    isAdmin: hasSession && profile?.admin,
    startSession,
    clearSession,
  };
};

export default useSession;
