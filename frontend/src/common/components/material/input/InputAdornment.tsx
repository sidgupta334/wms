import React from 'react';
import MUIInputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';

const InputAdornment: React.FC<InputAdornmentProps> = props => {
  const { children, ...inputAdornmentProps } = props;

  return (<MUIInputAdornment {...inputAdornmentProps}>{children}</MUIInputAdornment>);
};

export default InputAdornment;
