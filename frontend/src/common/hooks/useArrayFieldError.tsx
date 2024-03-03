import { useMemo } from 'react';
import { FieldError, Merge } from 'react-hook-form';
import { isArray, isEmpty } from 'lodash';

const formatArrayFieldErrors = (
  fieldErrors?: Merge<FieldError, (FieldError | undefined)[]>,
  fieldName?: string,
) => {
  let errorMessage: string | undefined;
  let errorsArray: FieldError[] = [];

  if (fieldErrors) {
    if (isArray(fieldErrors)) {
      const errorCount = fieldErrors.filter((error) => !!error).length;
      errorMessage = `Field contains ${errorCount} invalid ${fieldName}`;
      errorsArray = [...fieldErrors];
    } else if (!isEmpty(fieldErrors)) {
      errorMessage = fieldErrors.message;
    }
  }

  return {
    errorMessage,
    errorsArray,
  };
};

/**
 * Provides a consistent interface for managing
 * validation errors for array fields
 */
const useArrayFieldError = (
  fieldErrors?: Merge<FieldError, FieldError | undefined>,
  fieldName?: string,
) => {
  return useMemo(
    () => formatArrayFieldErrors(fieldErrors, fieldName),
    [fieldErrors, fieldName],
  );
};

export default useArrayFieldError;
