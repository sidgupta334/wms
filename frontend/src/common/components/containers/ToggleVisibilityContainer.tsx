import React from 'react';
import { Property } from 'csstype';

import { styled } from '@mui/material/styles';

type ToggleVisibilityContainerProps = {
  isVisible: boolean;
  display?: Property.Display;
  children: React.ReactElement;
};

type StyledContainerProps = {
  isVisible: boolean;
  display?: Property.Display;
};

const StyledContainer = styled('div', {
  shouldForwardProp: (prop) => {
    return prop !== 'isVisible' && prop !== 'display';
  },
})<StyledContainerProps>(({ isVisible, display }) => ({
  visibility: isVisible ? 'visible' : 'hidden',
  display: display || 'block',
}));

const ToggleVisibilityContainer: React.FC<ToggleVisibilityContainerProps> = ({
  children,
  isVisible,
  display,
}) => {
  return (
    <StyledContainer isVisible={isVisible} display={display}>
      {children}
    </StyledContainer>
  );
};

export default ToggleVisibilityContainer;
