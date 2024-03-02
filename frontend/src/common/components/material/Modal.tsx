import * as React from 'react';
import MUIModal, { ModalProps } from '@mui/material/Modal';

const Modal: React.FC<ModalProps> = (props) => {
  const { children, ...modalProps } = props;
  return <MUIModal {...modalProps}>{children}</MUIModal>;
};

export default Modal;
