import useMutation from 'common/hooks/useMutation';
import useSession from 'common/hooks/useSession';
import useSnackbar from 'common/hooks/useSnackbar';
import queryClient from 'common/utils/QueryClient';
import axiosApi from 'common/utils/axios';

const opportunityApi = axiosApi('opportunity');

const deleteOpportunityApi = (entityId: string) => {
  return opportunityApi.delete(`delete/${entityId}`);
};

const useDeleteOpportunityApi = () => {
  const { profile } = useSession();
  const { openSnackbar } = useSnackbar();
  return useMutation(deleteOpportunityApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['opportunities', profile?.externalId]);
      openSnackbar('Opportunity deleted successfully', 'success');
    },
  });
};

export default useDeleteOpportunityApi;
