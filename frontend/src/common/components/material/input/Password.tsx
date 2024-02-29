import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { FormTextFieldProps } from 'common/types/Form.type';
import FormTextField from './FormTextField';
import InputAdornment from './InputAdornment';
import IconButton from './IconButton';

const DEFAULT_LABEL = 'Password';
const DEFAULT_NAME = 'password';

const Password: React.FC<FormTextFieldProps> = React.forwardRef(
  ({ label, name, helperText }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const fieldLabel = label || DEFAULT_LABEL;

    return (
      <FormTextField
        fullWidth
        name={name || DEFAULT_NAME}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        required
        label={fieldLabel}
        helperText={helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((showPassword) => !showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        ref={ref}
      ></FormTextField>
    );
  },
);

export default Password;
