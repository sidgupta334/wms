import React, { useState } from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { SnackbarProps, SnackbarState } from 'common/types/Snackbar.type';
import useSnackbar from 'common/hooks/useSnackbar';

const initialState = {
  isOpen: false,
  message: '',
  variant: 'info' as AlertColor,
};

// We will only ever have one active instance of the Snackbar throughout the app
const Snackbar: React.FC<SnackbarProps> = (props) => {
  const [snackbarState, setSnackbarState] = useState(initialState);
  const { closeSnackbar } = useSnackbar((data: SnackbarState) => {
    setSnackbarState((prevState) => ({ ...prevState, ...data }));
  });

  return (
    <MUISnackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={5000}
      open={snackbarState?.isOpen}
      onClose={closeSnackbar}
      {...props}
    >
      <Alert variant="filled" severity={snackbarState?.variant || 'info'}>
        {snackbarState?.message}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
