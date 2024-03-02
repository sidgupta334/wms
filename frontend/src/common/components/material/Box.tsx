import React from 'react';

import MUIBox, { BoxProps } from '@mui/material/Box';

const Box: React.FC<BoxProps> = props => {
  const { children, ...boxProps } = props;

  return <MUIBox {...boxProps}>{children}</MUIBox>;
};

export default Box;
