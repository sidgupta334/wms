import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { NavBtnSizeType, StyledNavButton, StyledNavIcon } from './styles';

const StyledCloseIcon = StyledNavIcon(CloseIcon);

type CloseButtonProps = {
  size?: NavBtnSizeType;
  clickHandler?: (e: React.MouseEvent | React.KeyboardEvent) => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({ size = 'medium', clickHandler }) => {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    clickHandler && clickHandler(e);
    return;
  };

  return (
    <StyledNavButton
      size={size}
      startIcon={<StyledCloseIcon size={size} />}
      onClick={handleClick}
      variant="outlined"
    ></StyledNavButton>
  );
};

export default CloseButton;
