import { QueryFunction, QueryKey, useQuery as _useQuery } from 'react-query';

import { UseQueryResponse, UseQueryOptions } from 'common/types/Api.type';
import useApiSuccessHandler from './useApiSuccessHandler';
import useApiErrorHandler from './useApiErrorHandler';

/**
 * A wrapper for React Query's useQuery which manages the
 * state for API calls that request data from the server.
 * This is where we'll setup defaults and generic handlers for all queries.
 */
const useQuery = (
  queryKey: QueryKey,
  queryFn: QueryFunction<unknown, any>,
  options?: UseQueryOptions,
): UseQueryResponse => {
  const {
    showSuccessSnackbar = false,
    showErrorSnackbar = false,
    showValidationErrorSnackbar = false,
    ...opts
  } = options || {};
  const { formatError, errorHandler } = useApiErrorHandler(
    opts?.onError,
    showErrorSnackbar,
    showValidationErrorSnackbar,
  );
  const successHandler = useApiSuccessHandler(opts?.onSuccess, showSuccessSnackbar);
  const query = _useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    ...opts,
    onError: errorHandler,
    onSuccess: successHandler,
  });
  return {
    ...query,
    error: formatError(query.error),
  };
};

export default useQuery;
