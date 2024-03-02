import { UseQueryOptions } from 'common/types/Api.type';
import axiosApi from 'common/utils/axios';
import useDebounce from './useDebounce';
import useQuery from 'common/context/hooks/useQuery';
import { useCallback } from 'react';

const searchApi = axiosApi('search');

const searchSkillsApi = (term: string) => {
  return searchApi.get(`skills?term=${term}`);
};

const useSearchSkillsApi = (term: string, options: UseQueryOptions = {}) => {
  const debouncedTerm = useDebounce(term);
  const queryKey = ['search', 'skills'];

  if (debouncedTerm) {
    queryKey.push(debouncedTerm);
  }

  const queryResponse = useQuery(
    queryKey,
    useCallback(() => searchSkillsApi(debouncedTerm), [debouncedTerm]),
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

export default useSearchSkillsApi;
