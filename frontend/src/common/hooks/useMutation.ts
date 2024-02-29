import { MutateOptions, MutationFunction, useMutation as _useMutation } from 'react-query';

import { UseMutationResponse, UseMutationOptions } from 'common/types/Api.type';
import useApiErrorHandler from 'common/context/hooks/useApiErrorHandler';
import useApiSuccessHandler from 'common/context/hooks/useApiSuccessHandler';

/**
 * A wrapper for React Query's useMutation which manages the
 * state for API calls that modify data or perform side-effects on the server.
 * This is where we'll setup defaults and generic handlers for all mutations.
 */
const useMutation = (
  mutationFn: MutationFunction<any, any>,
  options?: UseMutationOptions,
): UseMutationResponse => {
  /**
   * useMutations are typically triggered by direct user actions
   * so we'll alert users in case of errors.
   * In most cases, a successful update should be made obvious
   * to users so we would not need a success alert by default.
   */
  const {
    showSuccessSnackbar = false,
    showErrorSnackbar = true,
    showValidationErrorSnackbar = false,
    transformInput,
    ...opts
  } = options || {};
  const { formatError, errorHandler } = useApiErrorHandler(
    opts?.onError,
    showErrorSnackbar,
    showValidationErrorSnackbar,
  );
  const successHandler = useApiSuccessHandler(opts?.onSuccess, showSuccessSnackbar);
  const mutation = _useMutation(mutationFn, {
    ...opts,
    onError: errorHandler,
    onSuccess: successHandler,
  });
  const errorResponse = formatError(mutation.error);

  const mutate = (data: any, options?: MutateOptions<any, any, any>) => {
    const submittedData = transformInput ? transformInput(data) : data;
    return mutation.mutate(submittedData, options);
  };

  const mutateAsync = (data: any, options?: MutateOptions<any, any, any>) => {
    const submittedData = transformInput ? transformInput(data) : data;
    return mutation.mutateAsync(submittedData, options);
  };
  return {
    ...mutation,
    error: errorResponse,
    mutate,
    mutateAsync,
    // So we don't have to use error.errors
    validationErrors: errorResponse?.errors,
    // Used as a react-hook-form submit handler. Event is passed, but unused.
    submit: (data?: any, event?: React.BaseSyntheticEvent) => {
      return mutate(data);
    },
  };
};

export default useMutation;
