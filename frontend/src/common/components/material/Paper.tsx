import React from 'react';

import MUIPaper, { PaperProps as MUIPaperProps } from '@mui/material/Paper';

export type PaperProps = MUIPaperProps;

const Paper: React.FC<PaperProps> = React.forwardRef((props, ref) => {
  const { children, ...paperProps } = props;
  return (
    <MUIPaper ref={ref} {...paperProps}>
      {children}
    </MUIPaper>
  );
});

export default Paper;
