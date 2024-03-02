import React from 'react';

import theme from 'common/theme';
import { Breakpoint } from '@mui/material';
import Stack from '../material/Stack';
import Box from '../material/Box';

type RootContainerProps = {
  header?: React.ReactElement;
  headerNavButton?: React.ReactElement;
  maxWidth?: Breakpoint;
  children: React.ReactElement | React.ReactNode;
  slimContent?: boolean;
  backgroundColor?: string;
};

const RootContainer: React.FC<RootContainerProps> = ({
  header,
  headerNavButton,
  slimContent,
  children,
  backgroundColor,
}) => {
  return (
    <Stack
      sx={{
        backgroundColor: backgroundColor || theme.palette.backgroundColor,
        borderRadius: '12px',
      }}
      p={3}
    >
      <Stack spacing={3} height="100%" px={{ xl: slimContent ? 10 : 0 }}>
        <Box sx={{ display: 'flex' }}>
          {headerNavButton}
          {header}
        </Box>
        {children}
      </Stack>
    </Stack>
  );
};

export default RootContainer;
