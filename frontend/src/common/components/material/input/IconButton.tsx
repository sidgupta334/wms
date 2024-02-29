import React from 'react';
import MUIIconButton, {
  IconButtonProps as MUIIconButtonProps,
} from '@mui/material/IconButton';

export type IconButtonProps = MUIIconButtonProps;

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, ...iconButtonProps } = props;

  return <MUIIconButton {...iconButtonProps}>{children}</MUIIconButton>;
};

export default IconButton;
