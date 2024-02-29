import React from 'react';

import FormTextField from './FormTextField';

import { FormTextFieldProps } from 'common/types/Form.type';

const DEFAULT_NAME = 'email';
const DEFAULT_LABEL = 'Email';

const Email: React.FC<FormTextFieldProps> = React.forwardRef(
  ({ name, label, errorMessage, InputProps, ...emailProps }, ref) => {
    return (
      <FormTextField
        name={name || DEFAULT_NAME}
        fullWidth
        type="text"
        variant="outlined"
        label={label || DEFAULT_LABEL}
        InputProps={InputProps}
        errorMessage={errorMessage}
        ref={ref}
        {...emailProps}
      ></FormTextField>
    );
  },
);

export default Email;
