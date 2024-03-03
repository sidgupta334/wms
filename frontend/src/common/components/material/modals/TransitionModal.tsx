import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import ColorPalette from 'common/theme/colorPalette';
import AppBoxShadows from 'common/theme/AppBoxShadows';
import Modal from '../Modal';
import Box from '../Box';

type TransitionModalProps = {
  open: boolean;
  children: React.ReactElement;
  onClosed?: Function;
};

const StyledBox = styled(
  Box,
  {},
)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 550,
  minHeight: 250,
  backgroundColor: ColorPalette.BLUEGRAY50,
  border: `1px solid ${ColorPalette.BLUEGRAY700}`,
  boxShadow: AppBoxShadows.shadow3,
  borderRadius: '0.75rem',
  p: 4,
}));

const TransitionModal: React.FC<TransitionModalProps> = ({ open, children, onClosed }) => {
  const [isOpen, setOpen] = useState<boolean>(open);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    onClosed && onClosed();
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="adguru-modal"
      aria-describedby="adguru-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          handleClose();
        }
      }}
      open={isOpen}
    >
      <Fade in={isOpen}>
        <div>
          <StyledBox>{children}</StyledBox>
        </div>
      </Fade>
    </Modal>
  );
};

export default TransitionModal;
