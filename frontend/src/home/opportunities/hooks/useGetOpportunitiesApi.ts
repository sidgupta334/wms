import useQuery from 'common/context/hooks/useQuery';
import useSession from 'common/hooks/useSession';
import { UseQueryOptions } from 'common/types/Api.type';
import axiosApi from 'common/utils/axios';
import { Opportunity } from '../types/Opportunity.type';
import { orderBy } from 'lodash';

const opportunityApi = axiosApi('opportunity');

const getAllOpportunitiesApi = () => {
  return opportunityApi.get('get');
};

const useGetOpportunitiesApi = (options: UseQueryOptions = {}) => {
  const { profile } = useSession();
  const queryResponse = useQuery(
    ['opportunities', profile?.externalId],
    getAllOpportunitiesApi,
    {
      ...options,
    },
  );

  const transformOpportunities = (data: Opportunity) => {
    return orderBy(data, 'timestamp', 'desc') as any[];
  };

  return {
    ...queryResponse,
    data: queryResponse.isSuccess ? transformOpportunities(queryResponse.data) : undefined,
  };
};

export default useGetOpportunitiesApi;
