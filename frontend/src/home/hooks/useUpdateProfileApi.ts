import useMutation from 'common/hooks/useMutation';
import useSnackbar from 'common/hooks/useSnackbar';
import queryClient from 'common/utils/QueryClient';
import axiosApi from 'common/utils/axios';

const employees = axiosApi('employees');

const employeesUpdateApi = (payload: any) => {
  return employees.put('update', payload);
};

const useUpdateProfileApi = () => {
  const { openSnackbar } = useSnackbar();
  return useMutation(employeesUpdateApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', 'me']);
      openSnackbar('Employee Updated successfully', 'success');
    },
  });
};

export default useUpdateProfileApi;
