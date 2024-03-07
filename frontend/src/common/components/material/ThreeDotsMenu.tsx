import React from 'react';
import { get } from 'lodash';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import { IconButtonProps } from './input/IconButton';
import FloatingMenu, { FloatingMenuItem } from './FloatingMenu';
import usePopoverState from 'common/hooks/usePopOverState';
import IconButton from './IconButton';
import ColorPalette from 'common/theme/colorPalette';

type ThreeDotMenuProps = Omit<IconButtonProps, 'onSelect'> & {
  items: FloatingMenuItem[];
  onSelect: (item: FloatingMenuItem) => void;
  onOpen?: () => void;
  disabled?: boolean;
};

// Also known as Kebab Menu
const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({
  items,
  onSelect,
  disabled,
  onOpen,
  ...props
}) => {
  const { anchorElement, openPopover, closePopover } = usePopoverState();
  const { palette } = useTheme();

  if (!items.length) return <></>;

  items = items.map((item: FloatingMenuItem) => {
    if (item.palettePath) {
      item.color = get(palette, item.palettePath);
    }
    return item;
  });

  const handleOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    onOpen && onOpen();
    openPopover(e);
  };

  const handleSelect = (item: FloatingMenuItem) => {
    onSelect(item);
    closePopover();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closePopover();
  };

  return (
    <>
      <IconButton
        sx={{ color: ColorPalette.BLUEGRAY600 }}
        onClick={handleOpen}
        disabled={disabled}
        {...props}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <FloatingMenu
        anchorEl={anchorElement}
        items={items}
        onClose={handleClose}
        onSelect={handleSelect}
      />
    </>
  );
};

export default ThreeDotMenu;
