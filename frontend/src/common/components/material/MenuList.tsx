import React from 'react';

import MUIMenu, { MenuProps as MUIMenuProps } from '@mui/material/Menu';
import MUIMenuItem, { MenuItemProps as MUIMenuItemProps } from '@mui/material/MenuItem';
import MUIMenuList, { MenuListProps } from '@mui/material/MenuList';

export type MenuProps = MUIMenuProps;
export type MenuItemProps = MUIMenuItemProps;

export const Menu: React.FC<MenuProps> = (props) => {
  const { children, ...menuProps } = props;

  return <MUIMenu {...menuProps}>{children}</MUIMenu>;
};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { children, ...menuItemProps } = props;

  return <MUIMenuItem {...menuItemProps}>{children}</MUIMenuItem>;
};

const MenuList: React.FC<MenuListProps> = (props) => {
  const { children, ...menuListProps } = props;

  return <MUIMenuList {...menuListProps}>{children}</MUIMenuList>;
};

export default MenuList;
