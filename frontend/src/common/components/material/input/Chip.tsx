import React from 'react';
import MUIChip, { ChipProps as MUIChipProps } from '@mui/material/Chip';

export type ChipProps = MUIChipProps;

const Chip: React.FC<ChipProps> = (props) => {
  const { children, ...chipProps } = props;

  return <MUIChip {...chipProps}>{children}</MUIChip>;
};

export default Chip;
