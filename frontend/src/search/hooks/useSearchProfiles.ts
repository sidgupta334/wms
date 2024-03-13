import useQuery from 'common/context/hooks/useQuery';
import { UseQueryOptions } from 'common/types/Api.type';
import axiosApi from 'common/utils/axios';
import { useCallback } from 'react';

const searchApi = axiosApi('search');

const searchEmployeesApi = (term: string) => {
  return searchApi.get(`employees?term=${term}`);
};

const useSearchProfiles = (term: string, options: UseQueryOptions = {}) => {
  const queryKey = ['search', 'skills', term];

  const queryResponse = useQuery(
    queryKey,
    useCallback(() => searchEmployeesApi(term), [term]),
    {
      enabled: !!term,
      ...options,
    },
  );

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? queryResponse?.data : [],
  };
};

export default useSearchProfiles;
