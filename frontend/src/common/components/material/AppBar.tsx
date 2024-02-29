import React from 'react';

import MUIAppBar, { AppBarProps } from '@mui/material/AppBar';

const AppBar: React.FC<AppBarProps> = (props) => {
  const { children, ...appBarProps } = props;

  return <MUIAppBar {...appBarProps}>{children}</MUIAppBar>;
};

export default AppBar;
