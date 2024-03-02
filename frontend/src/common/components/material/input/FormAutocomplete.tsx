import { differenceBy, get } from 'lodash';
import React from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { AutocompleteProps, FieldName } from 'common/types/Form.type';
import Autocomplete from './Autocomplete';
import useArrayFieldError from 'common/hooks/useArrayFieldError';

type RenderAutocompleteProps = {
  field: ControllerRenderProps<any, string>;
};

const FormAutocomplete: React.FC<AutocompleteProps> = React.forwardRef((props, ref) => {
  const {
    name,
    value,
    multiple,
    onChange,
    defaultValue,
    filterOptions,
    excludeOptions,
    ...otherProps
  } = props;
  const { control, formState } = useFormContext() || {};
  const { errors } = formState || {};

  const fieldErrors = get(errors, name || '');
  const { errorMessage, errorsArray } = useArrayFieldError(fieldErrors, name);

  const renderAutocomplete = ({ field }: RenderAutocompleteProps) => {
    const changeHandler = (value: any) => {
      field.onChange(value);
      onChange && onChange(value);
    };

    let appliedFilterOptions = filterOptions;

    if (excludeOptions?.length) {
      const isExcludeIds = typeof excludeOptions[0] === 'string';
      appliedFilterOptions = (options: any[] = [], state) => {
        const filteredOptions = isExcludeIds
          ? options.filter((option) => {
              const id = typeof option === 'string' ? option : option.id;
              return !(excludeOptions as string[]).includes(id);
            })
          : differenceBy(options, excludeOptions, 'id');

        return filterOptions ? filterOptions(filteredOptions, state) : filteredOptions;
      };
    }

    return (
      <Autocomplete
        errorMessage={errorMessage}
        errorsArray={errorsArray}
        multiple={multiple}
        filterOptions={appliedFilterOptions}
        {...otherProps}
        {...field}
        ref={ref}
        value={field.value || (multiple ? [] : null)}
        onChange={changeHandler}
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name as FieldName}
      defaultValue={defaultValue || value}
      render={renderAutocomplete}
    />
  );
});

export default FormAutocomplete;
