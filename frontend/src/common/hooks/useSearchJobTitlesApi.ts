import { UseQueryOptions } from 'common/types/Api.type';
import axiosApi from 'common/utils/axios';
import useDebounce from './useDebounce';
import useQuery from 'common/context/hooks/useQuery';
import { useCallback } from 'react';

const searchApi = axiosApi('search');

const searchJobTitlesApi = (term: string) => {
  if (!term) {
    return;
  }
  return searchApi.get(`job-titles?term=${term}`);
};

const useSearchJobTitlesApi = (term: string, options: UseQueryOptions = {}) => {
  const debouncedTerm = useDebounce(term);
  const queryKey = ['search', 'job-titles'];

  if (debouncedTerm) {
    queryKey.push(debouncedTerm);
  }

  const queryResponse = useQuery(
    queryKey,
    useCallback(() => searchJobTitlesApi(debouncedTerm), [debouncedTerm]),
    {
      ...options,
    },
  );

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? queryResponse?.data : [],
  };
};

export default useSearchJobTitlesApi;
