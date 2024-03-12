import useMutation from 'common/hooks/useMutation';
import useSnackbar from 'common/hooks/useSnackbar';
import queryClient from 'common/utils/QueryClient';
import axiosApi from 'common/utils/axios';

const endorsement = axiosApi('endorsement');

const createEndorsementApi = (payload: any) => {
  return endorsement.post('', payload);
};

export const useEndorseSkill = (profileId: string) => {
  const { openSnackbar } = useSnackbar();
  return useMutation(createEndorsementApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', 'search', profileId]);
      openSnackbar('Skill has been successfully Endorsed', 'success');
    },
  });
};
