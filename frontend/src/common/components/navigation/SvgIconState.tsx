import colorPalette from 'common/theme/colorPalette';
import React from 'react';

type SvgIconType = {
  DisabledIcon: React.FC<any>;
  ActiveIcon: React.FC<any>;
  size?: number;
  isActive?: boolean;
  color?: string;
  hoverColor?: string;
};

const SvgIconState: React.FC<SvgIconType> = ({
  DisabledIcon,
  ActiveIcon,
  size = 24,
  isActive = false,
  color = colorPalette.PRIMARY400,
  hoverColor = colorPalette.PRIMARY400,
}) => {
  return (
    <>
      {!isActive && (
        <DisabledIcon
          sx={{
            width: size,
            height: size,
            color: 'inherit',
            '&:hover': {
              color: hoverColor,
            },
            '&:active': {
              color,
            },
          }}
        />
      )}
      {isActive && (
        <ActiveIcon
          sx={{
            width: size,
            height: size,
            color,
          }}
        />
      )}
    </>
  );
};
export default SvgIconState;
