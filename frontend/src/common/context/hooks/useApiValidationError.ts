import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FieldName } from 'common/types/Form.type';

/**
 * Sets an error in the parent form when we get server validation errors
 * for individual fields so we can properly disable form submission/progression
 */
const useApiValidationError = (isValid: boolean, fieldName: string, validate?: Function) => {
  const { setError, clearErrors, getValues } = useFormContext();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);

      /**
       * Handle validation on initialization if we have a
       * field that may have a value at start like a previously
       * visited form step
       */
      const value = getValues(fieldName as FieldName);
      validate && validate(value);
    }

    if (isValid) {
      clearErrors(`api.${fieldName}` as FieldName);
      return;
    }

    setError(`api.${fieldName}` as FieldName, {
      type: 'manual',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, fieldName, initialized]);
};

export default useApiValidationError;
