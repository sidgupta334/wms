import { useEffect } from 'react';
import { useForm as _useForm, UseFormReturn, FieldPath, FieldValues } from 'react-hook-form';
import { UseFormProps } from 'common/types/Form.type';

/**
 * useForm manages form data and client-side validation.
 * This wrapper helps us work with server validation as well.
 */
const useForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(props?: UseFormProps<TFieldValues, TContext>) => {
  const { validationErrors, showMultipleMessages = true, ...config } = props || {};
  const form = _useForm<TFieldValues, TContext>(config);
  /**
   * The defaultValues reference changes on render, so we can't
   * pass it as a useEffect dependency. We'll pass a boolean instead,
   * since we only need to know if the default value has been loaded.
   */
  const hasDefaultValues = !!config.defaultValues;

  useEffect(() => {
    if (validationErrors) {
      /**
       * Calling setError allows us to display server validation
       * the same way we do with client validation on submit
       * except that it clears when the input changes.
       * Server side validation doesn't re-evaluate until the
       * next submit so we'd rather hide them from the user
       * as they type to avoid a seemingly persistent error.
       */
      validationErrors.forEach((error) => {
        form.setError(error.key as FieldPath<TFieldValues>, {
          type: 'manual',
          message: showMultipleMessages ? error.messages.join('\n') : error.messages[0],
        });
      });
    }

    if (hasDefaultValues) {
      // Ensure that form contains default values if the default starts out empty (still loading)
      // Note: the type of config.defaultValues is `TFieldValues | AsyncDefaultValues<TFieldValues>`,
      // and since form.reset only accepts an object typed as: TFieldValues, here we are forced
      // to check its value at runtime (to inform devs if doing something unexpected), and cast
      // to tell the compiler to shut up
      console.assert(typeof config?.defaultValues === 'object');
      form.reset(config?.defaultValues as TFieldValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationErrors, hasDefaultValues]);

  return form as UseFormReturn<TFieldValues, TContext>;
};

export default useForm;
