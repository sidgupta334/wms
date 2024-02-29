import MUIListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import MUIListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import MUIListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import MUIListItemAvatar, { ListItemAvatarProps } from '@mui/material/ListItemAvatar';

export const ListItemIcon: React.FC<ListItemIconProps> = (props) => {
  const { children, ...listItemIconProps } = props;
  return <MUIListItemIcon {...listItemIconProps}> {children}</MUIListItemIcon>;
};

export const ListItemText: React.FC<ListItemTextProps> = (props) => {
  const { children, ...listItemTextProps } = props;
  return <MUIListItemText {...listItemTextProps}> {children}</MUIListItemText>;
};

export const ListItemAvatar: React.FC<ListItemAvatarProps> = (props) => {
  const { children, ...listItemAvatarProps } = props;
  return <MUIListItemAvatar {...listItemAvatarProps}>{children}</MUIListItemAvatar>;
};

const ListItemButton: React.FC<ListItemButtonProps> = (props) => {
  const { children, ...listItemButtonProps } = props;
  return <MUIListItemButton {...listItemButtonProps}>{children}</MUIListItemButton>;
};

export default ListItemButton;
