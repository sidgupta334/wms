import useQuery from 'common/context/hooks/useQuery';
import axiosApi from 'common/utils/axios';

const searchApi = axiosApi('search');

const getSearchProfileApi = (profileId: string) => {
  return searchApi.get(`employees/${profileId}`);
};

const useGetSearchProfileById = (profileId: string) => {
  const queryKey = ['profile', 'search', profileId];
  const queryResponse = useQuery(queryKey, () => getSearchProfileApi(profileId));

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? queryResponse.data : [],
  };
};

export default useGetSearchProfileById;
