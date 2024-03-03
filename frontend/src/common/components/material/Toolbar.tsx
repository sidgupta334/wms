import React from 'react';
import MUIToolbar, { ToolbarProps } from '@mui/material/Toolbar';

const Toolbar: React.FC<ToolbarProps> = props => {
  const { children, ...toolbarProps } = props;

  return <MUIToolbar {...toolbarProps}>{children}</MUIToolbar>;
};

export default Toolbar;
