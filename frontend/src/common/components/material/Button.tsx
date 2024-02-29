import React from 'react';

import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { LinkProps } from 'react-router-dom';

export type ButtonProps = MUIButtonProps & {
  btntype?: 'primary' | 'secondary' | 'tertiary';
  // These two props are valid but not listed in MUIButtonProps for some reason
  component?: React.ForwardRefExoticComponent<LinkProps>;
  to?: string;
};

const StyledButton = styled(MUIButton)(({ theme }) => ({
  textTransform: 'none',
  letterSpacing: '0.04rem',
  ...theme.typography.button1,
  '&.MuiButton-sizeSmall': {
    fontSize: theme.typography.button2.fontSize,
  },
}));

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...buttonProps } = props;

  return <StyledButton {...buttonProps}>{children}</StyledButton>;
};

export default Button;
