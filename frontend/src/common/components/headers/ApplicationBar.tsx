import { styled } from '@mui/material/styles';
import AppBoxShadows from 'common/theme/AppBoxShadows';
import colorPalette from 'common/theme/colorPalette';
import React from 'react';
import Toolbar from '../material/Toolbar';
import AppBar from '../material/AppBar';

const DEFAULT_HEIGHT = '4.15rem';
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: colorPalette.WHITE,
  boxShadow: AppBoxShadows.shadow4,
  height: '2.875rem',
});

type ApplicationBarProps = {
  children: React.ReactElement;
  customHeight?: string;
};

const ApplicationBar: React.FC<ApplicationBarProps> = ({ children, customHeight }) => {
  return (
    <StyledAppBar position="sticky" sx={{ height: customHeight || DEFAULT_HEIGHT }}>
      <StyledToolbar variant="dense">{children}</StyledToolbar>
    </StyledAppBar>
  );
};

export default ApplicationBar;
