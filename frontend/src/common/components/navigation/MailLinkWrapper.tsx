import React from 'react';
import { styled } from '@mui/material/styles';

const StyledMailLinkWrapper = styled('span')({
  cursor: 'pointer',
});

type MailLinkWrapperProps = {
  address: string;
  children: React.ReactElement;
};
const MailLinkWrapper: React.FC<MailLinkWrapperProps> = ({ address, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${address}`;
  };

  return <StyledMailLinkWrapper onClick={handleClick}>{children}</StyledMailLinkWrapper>;
};

export default MailLinkWrapper;
