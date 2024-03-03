import React from 'react';

import MIUButtonBase, {
  ButtonBaseProps as MUIButtonBaseProps,
} from '@mui/material/ButtonBase';

export type ButtonBaseProps = MUIButtonBaseProps;

const ButtonBase: React.FC<ButtonBaseProps> = (props) => {
  const { children, ...buttonBaseProps } = props;

  return <MIUButtonBase {...buttonBaseProps}>{children}</MIUButtonBase>;
};

export default ButtonBase;
