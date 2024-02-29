import {
  UseMutationResult,
  UseQueryResult,
  UseInfiniteQueryResult,
  UseMutationOptions as _UseMutationOptions,
  UseQueryOptions as _UseQueryOptions,
  UseInfiniteQueryOptions as _UseInfiniteQueryOptions,
} from 'react-query';

export type ValidationError = {
  key: string;
  messages: string[];
};

export type SuccessResponse = {
  data?: any;
  message: string;
  statusCode: number;
};

export type ErrorResponse = {
  errors: ValidationError[];
  message: string;
  statusCode?: number;
  status?: number;
};

export type UseMutationResponse = Omit<UseMutationResult, 'error' | 'data'> & {
  submit: (data?: any, event?: React.BaseSyntheticEvent) => void;
  data?: SuccessResponse;
  error?: ErrorResponse;
  validationErrors?: ValidationError[];
};

export type UseQueryResponse = Omit<UseQueryResult, 'error' | 'data'> & {
  // Data returned may be transformed with the 'select' method
  data?: any;
  error?: ErrorResponse;
};

export type UseInfiniteQueryResponse = Omit<UseInfiniteQueryResult, 'error' | 'data'> & {
  data?: any;
  error?: ErrorResponse;
};

export type QueryErrorHandler = (
  error?: ErrorResponse,
  variables?: any,
  context?: any,
) => Promise<unknown> | void;

export type AdditionalQueryOptions = {
  showErrorSnackbar?: boolean;
  shouldShowErrorSnackbar?: (statusCode: number) => boolean;
  showSuccessSnackbar?: boolean;
  showValidationErrorSnackbar?: boolean;
  transformInput?: (params: any) => any;
  meta?: any;
};

export type AdditionalInfiniteQueryOptions = AdditionalQueryOptions & {
  getNextPageParam: (params: any) => any;
  entityKey: string;
};

export type UseQueryOptions = Omit<_UseQueryOptions<any, any>, 'queryKey' | 'queryFn'> &
  AdditionalQueryOptions;

export type UseInfiniteQueryOptions = Omit<
  _UseInfiniteQueryOptions<any, any>,
  'queryKey' | 'queryFn'
> &
  AdditionalInfiniteQueryOptions;

export type UseMutationOptions = Omit<_UseMutationOptions<any, any, any, any>, 'mutationFn'> &
  AdditionalQueryOptions;

export type PageParams = {
  page?: number;
  size?: number;
};

export type PaginationMetaData = {
  page: number;
  isLastPage: boolean;
  total?: number;
};
