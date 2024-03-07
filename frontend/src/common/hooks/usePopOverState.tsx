import React, { useState } from 'react';

// Boilerplate for opening/closing MUI's Popover and Menu components
const usePopoverState = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const openPopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorElement(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorElement(null);
  };

  return {
    anchorElement,
    openPopover,
    closePopover,
  };
};

export default usePopoverState;
