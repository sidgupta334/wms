import { styled } from '@mui/material/styles';
import Button from 'common/components/material/Button';
import colorPalette from 'common/theme/colorPalette';
import React from 'react';

export type NavBtnSizeType = 'small' | 'medium' | 'large';
export type NavIconBtnProps = { size: NavBtnSizeType };

export const NAV_ICON_STYLE = {
  small: {
    width: '0.9rem',
    height: '0.9rem',
  },
  medium: {
    width: '1.2rem',
    height: '1.2rem',
  },
  large: {},
} as any;

export const NAV_BUTTON_STYLE = {
  small: {
    minWidth: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    padding: 0,
  },
  medium: {
    minWidth: '2.15rem',
    width: '2.15rem',
    height: '2.15rem',
    padding: 0,
  },
  large: {},
} as any;

export const StyledNavIcon = (icon: React.FC) =>
  styled(icon, {
    shouldForwardProp: (prop) => prop !== 'size',
  })<NavIconBtnProps>(({ size }) => ({
    color: colorPalette.PRIMARY400,
    ...(size && NAV_ICON_STYLE[size]),
  }));

export const StyledNavButton = styled(Button)(({ size }) => ({
  '.MuiButton-startIcon': {
    margin: 0,
  },
  borderColor: colorPalette.GRAY100,
  borderRadius: '6px',
  '&:hover': {
    borderColor: colorPalette.PRIMARY400,
  },
  '&:focus': {
    backgroundColor: colorPalette.PRIMARY50,
  },
  ...(size && NAV_BUTTON_STYLE[size]),
}));
