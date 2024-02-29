import { FieldName, FormTextFieldProps } from 'common/types/Form.type';
import { RenderTextFieldProps } from 'common/types/renderer-text-field-props.type';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../TextField';

// This component is a controlled text field and must be placed inside a FormProvider
const FormTextField = React.forwardRef((props: FormTextFieldProps, ref: any) => {
  const { name, helperText, errorMessage, onChange, defaultValue, value, ...otherProps } =
    props;

  const { formState, control } = useFormContext();
  const { errors } = formState;

  const displayedErrorMessage = errorMessage || get(errors, `${name}.message`);

  const renderTextField = ({ field }: RenderTextFieldProps) => {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      field.onChange(e);
      onChange && onChange(value);
    };

    return (
      <TextField
        error={!!displayedErrorMessage}
        {...otherProps}
        {...field}
        ref={ref}
        value={field.value || ''}
        onChange={changeHandler}
        autoComplete="on"
      />
    );
  };

  return (
    <Controller
      control={control}
      name={name as FieldName}
      defaultValue={defaultValue || value}
      render={renderTextField}
    />
  );
});

export default FormTextField;
