import React from 'react';
import MUIGrid, { GridProps } from '@mui/material/Grid';

const Grid: React.FC<GridProps> = props => {
  const { children, ...gridProps } = props;

  return <MUIGrid {...gridProps}>{children}</MUIGrid>;
};

export default Grid;
