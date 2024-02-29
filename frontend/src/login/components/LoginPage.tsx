import { Stack } from '@mui/material';
import LoginContainer from './LoginContainer';

export const LoginPage: React.FC = () => {
  return (
    <Stack width="100%" height="100%" direction="row">
      <img src="/images/login-image.png" alt="" height="100%" width="50%" />
      <LoginContainer />
    </Stack>
  );
};
