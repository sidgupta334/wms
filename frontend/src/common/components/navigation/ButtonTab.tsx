import { styled } from '@mui/material/styles';
import React from 'react';

import AppBoxShadows from 'common/theme/AppBoxShadows';
import ColorPalette from 'common/theme/colorPalette';
import SvgIconState from './SvgIconState';
import ButtonBase from '../material/ButtonBase';
import Stack from '../material/Stack';
import Typography from '../material/Typography';

export type ButtonTabConfig = {
  value: string;
  label: string;
  defaultIcon?: React.FC;
  activeIcon?: React.FC;
  iconSize?: number;
  fontSize?: number;
};

type ButtonTabProps = ButtonTabConfig & {
  isActive: boolean;
};

type StyledTabProps = {
  isActive: boolean;
};

const StyledTab = styled(ButtonBase, {
  shouldForwardProp: (prop) => {
    return prop !== 'isActive';
  },
})<StyledTabProps>(({ theme, isActive }) => {
  const activeStyles = isActive
    ? {
        color: ColorPalette.WHITE,
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: ColorPalette.PRIMARY500,
        boxShadow: AppBoxShadows.shadow3,
      }
    : {};
  return {
    padding: '.5rem 1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: ColorPalette.WHITE,
    border: `1px solid ${ColorPalette.BLUEGRAY700}`,
    color: ColorPalette.BLUEGRAY700,
    '&:hover': {
      color: isActive ? ColorPalette.WHITE : ColorPalette.PRIMARY400,
      borderColor: ColorPalette.PRIMARY400,
      boxShadow: AppBoxShadows.shadow3,
    },
    ...activeStyles,
  };
});

const ButtonTab: React.FC<ButtonTabProps> = ({
  value,
  label,
  defaultIcon,
  activeIcon,
  isActive,
  iconSize = 24,
  fontSize = 12,
}) => {
  return (
    <StyledTab isActive={isActive} className="button-tab" data-tab={value}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {activeIcon && defaultIcon && (
          <SvgIconState
            ActiveIcon={activeIcon}
            DisabledIcon={defaultIcon}
            isActive={isActive}
            size={iconSize}
          />
        )}
        <Typography variant="body3" fontWeight={500} fontSize={fontSize}>
          {label}
        </Typography>
      </Stack>
    </StyledTab>
  );
};

export default ButtonTab;
