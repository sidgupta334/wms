import React from 'react';
import MUIStack, { StackProps } from '@mui/material/Stack';

const Stack: React.FC<StackProps> = props => {
  const { children, ...stackProps } = props;

  return <MUIStack {...stackProps}>{children}</MUIStack>;
};

export default Stack;
