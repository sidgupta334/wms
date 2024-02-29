import { SnackbarProps as MUISnackbarProps, SnackbarCloseReason } from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert';

export type SnackbarProps = Omit<MUISnackbarProps, 'children'> & {
  snackbarKey?: string;
  variant?: AlertColor;
  children?: React.ReactElement<any, any> | string;
};

export type SnackbarState = {
  isOpen: boolean;
  message: string;
  variant?: AlertColor;
};
