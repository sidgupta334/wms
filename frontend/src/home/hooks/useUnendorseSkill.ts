import useMutation from 'common/hooks/useMutation';
import useSnackbar from 'common/hooks/useSnackbar';
import queryClient from 'common/utils/QueryClient';
import axiosApi from 'common/utils/axios';

const endorsement = axiosApi('endorsement');

const deleteEndorsementApi = (payload: any) => {
  return endorsement.post('unendorse', payload);
};

export const useUnendorseSkill = (profileId: string) => {
  const { openSnackbar } = useSnackbar();
  return useMutation(deleteEndorsementApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', 'search', profileId]);
      openSnackbar('Skill has been successfully Unendorsed', 'success');
    },
  });
};
