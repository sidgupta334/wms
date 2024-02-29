import { useEffect } from 'react';
import { AlertColor } from '@mui/material/Alert';

import PubSub from 'common/utils/PubSub';

const snackbarPubSub = new PubSub();

const openSnackbar = (message: string, variant?: AlertColor) => {
  snackbarPubSub.publish({
    isOpen: true,
    message,
    variant,
  });
};

const closeSnackbar = () => {
  snackbarPubSub.publish({
    isOpen: false,
  });
};

const useSnackbar = (subscriber?: Function) => {
  useEffect(() => {
    if (subscriber) {
      snackbarPubSub.subscribe(subscriber);
      return () => {
        snackbarPubSub.unsubscribe(subscriber);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    openSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
