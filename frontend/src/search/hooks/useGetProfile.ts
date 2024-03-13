import useQuery from 'common/context/hooks/useQuery';
import { UseQueryOptions } from 'common/types/Api.type';
import axiosApi from 'common/utils/axios';
import { useCallback } from 'react';

const searchApi = axiosApi('search');

const getEmployeesApi = (externalId: string) => {
  return searchApi.get(`employees/${externalId}`);
};

const useGetProfile = (externalId: string, options: UseQueryOptions = {}) => {
  const queryKey = ['explore', 'profile', externalId];

  const queryResponse = useQuery(
    queryKey,
    useCallback(() => getEmployeesApi(externalId), [externalId]),
    {
      enabled: !!externalId,
      ...options,
    },
  );

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? queryResponse?.data : null,
  };
};

export default useGetProfile;
