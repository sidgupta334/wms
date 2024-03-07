import useMutation from 'common/hooks/useMutation';
import useSession from 'common/hooks/useSession';
import useSnackbar from 'common/hooks/useSnackbar';
import queryClient from 'common/utils/QueryClient';
import axiosApi from 'common/utils/axios';

const opportunities = axiosApi('opportunity');

const opportunityCreateApi = (payload: any) => {
  return opportunities.post('create', payload);
};

const useCreateOpportunityApi = () => {
  const { profile } = useSession();
  const { openSnackbar } = useSnackbar();
  return useMutation(opportunityCreateApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['opportunities', profile?.externalId]);
      openSnackbar('Opportunity created successfully', 'success');
    },
  });
};

export default useCreateOpportunityApi;
