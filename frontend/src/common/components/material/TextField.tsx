import { styled } from '@mui/material/styles';
import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import React from 'react';

import ColorPalette from 'common/theme/colorPalette';
import Typography from './Typography';

export type TextFieldProps = MUITextFieldProps;

const StyledTextField = styled(MUITextField)(() => ({
  '& .MuiOutlinedInput-root,.MuiOutlinedInput-root.MuiAutocomplete-inputRoot,.MuiOutlinedInput-root.MuiInputBase-sizeSmall.MuiAutocomplete-inputRoot':
    {
      padding: '0.5rem 0rem',
      borderRadius: '0.75rem',
    },
  '& .MuiInputLabel-shrink': { fontSize: '0.75rem' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '0.75rem',
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.125rem',
      '& .MuiTypography-root': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      },
    },
    '& input.MuiInputBase-input.MuiInputBase-inputSizeSmall': {
      padding: '0.4rem 1rem',
    },
    '& input.MuiInputBase-input, .MuiSelect-select': {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5rem',
      padding: '0.844rem',
      height: '0.5rem',
    },
    '& .MuiSelect-outlined': {
      padding: '0.375rem 0.844rem',
    },
    '& input:valid, textarea:valid, .MuiSelect-select': {
      color: ColorPalette.BLUEGRAY900,
    },
    '& input::placeholder': {
      color: ColorPalette.BLUEGRAY600,
    },
    '&.Mui-focused fieldset': {
      borderColor: ColorPalette.PRIMARY400,
    },
    '&.Mui-error fieldset': {
      borderColor: ColorPalette.RED400,
    },
    '&:has(.MuiChip-root)': {
      paddingLeft: '0.3rem',
    },
    '& textarea': {
      padding: '0.375rem 0.844rem',
    },
  },

  '& label': {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1.125rem',
    '&.Mui-focused': {
      color: ColorPalette.PRIMARY400,
    },
    '&.Mui-error': {
      color: ColorPalette.RED400,
    },
  },

  '& .MuiFormHelperText-root': {
    color: ColorPalette.BLUEGRAY500,
    '&.Mui-error': {
      color: ColorPalette.RED400,
    },
  },

  '& .MuiInputAdornment-positionStart': {
    paddingLeft: '0.75rem',
  },
  '& .MuiInputAdornment-positionEnd': {
    paddingRight: '0.75rem',
  },
  '[type="search"]::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
  },
  '[type="search"]::-webkit-search-decoration': {
    WebkitAppearance: 'none',
    appearance: 'none',
  },
}));

const TextField: React.FC<TextFieldProps> = React.forwardRef((props, ref) => {
  const label = props?.label && <Typography variant="body4">{props.label}</Typography>;

  const helperText = props?.helperText && (
    <Typography fontSize="0.625rem" fontWeight="400" lineHeight="0.937rem" variant="caption">
      {props.helperText}
    </Typography>
  );

  return (
    <StyledTextField
      label={label}
      helperText={helperText}
      variant="outlined"
      ref={ref}
      {...props}
    ></StyledTextField>
  );
});

export default TextField;
