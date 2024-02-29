import React from 'react';
import { styled } from '@mui/material';

import ListItemButton, { ListItemIcon, ListItemText } from '../material/ListItemButton';
import ColorPalette from 'common/theme/colorPalette';
import Typography from '../material/Typography';

const DEFAULT_TEXT_COLOR = ColorPalette.BLUEGRAY800;
const DEFAULT_ICON_COLOR = ColorPalette.BLUEGRAY600;

type MenuItemButtonProps = {
  onClick: () => void;
  children: React.ReactElement;
  label: string;
  color?: string;
};

const StyledListItem = styled(ListItemButton)({
  paddingLeft: 26,
  paddingRight: 26,
});

const StyledListItemIcon = styled(ListItemIcon)(({ color }) => ({
  minWidth: 48,
  '.MuiSvgIcon-root': {
    color,
  },
}));

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  onClick,
  children,
  label,
  color,
}) => {
  const iconColor = color || DEFAULT_ICON_COLOR;
  const textColor = color || DEFAULT_TEXT_COLOR;
  return (
    <StyledListItem onClick={onClick}>
      <StyledListItemIcon color={iconColor}>{children}</StyledListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ color: textColor }} variant="body2" color={textColor}>
            {label}
          </Typography>
        }
      />
    </StyledListItem>
  );
};

export default MenuItemButton;
