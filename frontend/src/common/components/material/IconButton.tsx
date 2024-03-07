import React from 'react';
import MUIIconButton, { IconButtonProps } from '@mui/material/IconButton';

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, ...iconButtonProps } = props;

  return <MUIIconButton {...iconButtonProps}>{children}</MUIIconButton>;
};

export default IconButton;
