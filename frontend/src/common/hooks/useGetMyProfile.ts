import { useLoggedInProfile } from 'common/context/hooks/loggedInProfile';
import useQuery from 'common/context/hooks/useQuery';
import { UseQueryOptions } from 'common/types/Api.type';
import axios from 'common/utils/axios';
import { useEffect } from 'react';

const authApi = axios('auth');

const getProfileApi = () => {
  return authApi.get('me');
};

const useGetMyProfile = (options: UseQueryOptions = {}) => {
  const { loggedInProfile, setLoggedInProfile } = useLoggedInProfile();
  const queryKey = ['profile', 'me'];
  const queryResponse = useQuery(queryKey, getProfileApi, {
    ...options,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!loggedInProfile && queryResponse?.data?.id) {
      setLoggedInProfile(queryResponse.data);
    }
  }, [loggedInProfile, queryResponse.data, setLoggedInProfile]);

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? queryResponse.data : undefined,
  };
};

export default useGetMyProfile;
