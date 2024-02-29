import { AxiosError } from 'axios';
import { get } from 'lodash';
import { AlertColor } from '@mui/material/Alert';

import { ErrorResponse } from 'common/types/Api.type';
import useSnackbar from 'common/hooks/useSnackbar';

const DEFAULT_ERROR_MESSAGE = 'Looks like something went wrong';
// 503 Service Unavailable. Could also work for Internet connection issues.
const DEFAULT_ERROR_CODE = 503;

const createFallbackErrorResponse = (error: AxiosError): ErrorResponse => {
  return {
    errors: [],
    message: error.message || DEFAULT_ERROR_MESSAGE,
    status: error.response?.status || DEFAULT_ERROR_CODE,
  };
};

const getSnackbarSeverity = (status = DEFAULT_ERROR_CODE): AlertColor => {
  return status < 500 ? 'warning' : 'error';
};

// The error response should be the same we defined on the server
const formatError = (error?: AxiosError | null): ErrorResponse | undefined => {
  if (!error) {
    return;
  }
  return (error.response?.data || createFallbackErrorResponse(error)) as ErrorResponse;
};

const useApiErrorHandler = (
  onError?: any,
  showErrorSnackbar?: boolean,
  showValidationErrorSnackbar?: boolean,
) => {
  const { openSnackbar } = useSnackbar();
  const errorHandler = (error: AxiosError, data?: any, context?: any) => {
    const formattedError = formatError(error);
    const validationMessage = showValidationErrorSnackbar
      ? get(formattedError, 'errors.[0].messages.[0]')
      : '';
    const errorMessage = showErrorSnackbar
      ? get(formattedError, 'message', DEFAULT_ERROR_MESSAGE)
      : '';

    if (onError) {
      onError(formattedError, data, context);
    }

    if (validationMessage || errorMessage) {
      const severity = getSnackbarSeverity(formattedError?.status);
      openSnackbar(validationMessage || errorMessage, severity);
    }
  };
  return {
    formatError,
    errorHandler,
  };
};

export default useApiErrorHandler;
