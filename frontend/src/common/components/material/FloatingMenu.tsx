import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Menu,
  MenuItem,
  MenuProps,
  MenuItemProps,
} from 'common/components/material/MenuList';
import ColorPalette from 'common/theme/colorPalette';

export type FloatingMenuItem<ValueType = string> = {
  value: ValueType;
  label?: string;
  color?: string;
  palettePath?: string;
};

const StyledMenu = styled(Menu)<MenuProps>(({ theme }) => ({
  marginTop: 3,
  '.MuiPaper-root': {
    backgroundColor: ColorPalette.WHITE,
    borderRadius: 6,
  },
  '.MuiList-root': {
    paddingTop: 4,
    paddingBottom: 4,
    minWidth: 127,
  },
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => {
    return prop !== 'color';
  },
})<MenuItemProps>(({ color, theme }) => ({
  color: color || ColorPalette.BLUEGRAY900,
  fontSize: '16px',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: ColorPalette.PRIMARY50,
    color: color || ColorPalette.PRIMARY400,
  },
}));

type FloatingMenuProps = {
  items?: FloatingMenuItem[];
  onSelect?: (item: FloatingMenuItem) => void;
  disabled?: boolean;
  defaultItemColor?: string;
  itemProps?: MenuItemProps;
} & Omit<MenuProps, 'open' | 'onSelect'>;

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  disabled,
  items,
  onSelect,
  defaultItemColor,
  anchorEl,
  itemProps = {},
  children,
  ...menuProps
}) => {
  return (
    <StyledMenu disableScrollLock={true} open={!!anchorEl} anchorEl={anchorEl} {...menuProps}>
      {children}
      {items?.map((item: FloatingMenuItem, index: number) => (
        <StyledMenuItem
          key={index}
          value={typeof item === 'string' ? item : item.value}
          color={(item as FloatingMenuItem).color || defaultItemColor}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onSelect && onSelect(item);
          }}
          {...itemProps}
        >
          {typeof item === 'string' ? item : item.label || item.value}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
};

export default FloatingMenu;
