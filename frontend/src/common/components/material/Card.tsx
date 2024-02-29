import { CardContent as MUICardContent } from '@mui/material';
import MUICard, { CardProps as MUICardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import AppBoxShadows from 'common/theme/AppBoxShadows';
import colorPalette from 'common/theme/colorPalette';

export enum CardBoxShadow {
  SHADOW1 = 'shadow1',
  SHADOW2 = 'shadow2',
  SHADOW3 = 'shadow3',
  SHADOW4 = 'shadow4',
  SHADOW5 = 'shadow5',
  SHADOW6 = 'shadow6',
  SHADOW7 = 'shadow7',
}

export type CardProps = MUICardProps & {
  noElevation?: boolean;
  raiseOnHover?: boolean;
  boxShadow?: CardBoxShadow;
  hoverShadow?: CardBoxShadow;
};
export const CardContent = MUICardContent;

const Card: React.FC<CardProps> = styled((props: CardProps) => {
  const {
    children,
    raiseOnHover = false,
    noElevation = false,
    boxShadow = CardBoxShadow.SHADOW1,
    hoverShadow = CardBoxShadow.SHADOW1,
    sx,
    ...cardProps
  } = props;
  const [currentBoxShadow, setBoxShadow] = useState<string | undefined>(
    boxShadow && AppBoxShadows[boxShadow],
  );

  const raiseCard = () => {
    setBoxShadow(hoverShadow && AppBoxShadows[hoverShadow]);
  };

  const lowerCard = () => {
    setBoxShadow(boxShadow && AppBoxShadows[boxShadow]);
  };

  return (
    <MUICard
      {...cardProps}
      elevation={0}
      onMouseEnter={raiseOnHover ? raiseCard : undefined}
      onMouseLeave={raiseOnHover ? lowerCard : undefined}
      sx={{
        boxShadow: noElevation ? 'none' : currentBoxShadow,
        ...sx,
      }}
    >
      {children}
    </MUICard>
  );
})(({ theme }) => ({
  borderRadius: '0.75rem',
  border: `1px solid ${colorPalette.GRAY200}`,
  [theme.breakpoints.down('md')]: {
    '&.full-width': {
      borderRadius: 'unset',
      borderLeft: `none`,
      borderRight: `none`,
    },
  },
}));

export default Card;
