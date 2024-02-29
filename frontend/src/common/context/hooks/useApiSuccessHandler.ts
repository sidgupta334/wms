import useSnackbar from 'common/hooks/useSnackbar';
import { SuccessResponse } from 'common/types/Api.type';

const useApiSuccessHandler = (onSuccess?: any, showSuccessSnackbar?: boolean) => {
  const { openSnackbar } = useSnackbar();
  const successHandler = (response: SuccessResponse, params?: any, context?: any) => {
    if (onSuccess) {
      onSuccess(response, params, context);
    }
    if (showSuccessSnackbar && response.message) {
      openSnackbar(response.message, 'success');
    }
  };
  return successHandler;
};

export default useApiSuccessHandler;
