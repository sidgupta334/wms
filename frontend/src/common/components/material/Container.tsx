import React from 'react';

import MUIContainer, { ContainerProps } from '@mui/material/Container';

const Container: React.FC<ContainerProps> = (props) => {
  const { children, ...containerProps } = props;
  return <MUIContainer {...containerProps}>{children}</MUIContainer>;
};

export default Container;
