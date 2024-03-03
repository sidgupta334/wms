import { Stack } from '@mui/material';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';
import LoginForm from './LoginForm';
import Card, { CardBoxShadow, CardContent } from 'common/components/material/Card';

const LoginContainer: React.FC = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      p={15}
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ backgroundColor: ColorPalette.SECONDARY50 }}
    >
      <Stack direction="row" spacing={2}>
        <img src="/images/logo.png" width={80} height={80} />
        <Typography variant="h1" color={ColorPalette.PRIMARY700} sx={{ fontSize: 48 }}>
          WMS Portal
        </Typography>
      </Stack>
      <Card boxShadow={CardBoxShadow.SHADOW3} hoverShadow={CardBoxShadow.SHADOW5}>
        <CardContent>
          <Stack spacing={5}>
            <Typography variant="h2" fontWeight={500} alignSelf="flex-start">
              Login
            </Typography>
            <LoginForm />
            <Typography variant="body3" alignSelf="flex-end">
              Need help? <span style={{ color: ColorPalette.PRIMARY500 }}> Contact Us </span>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginContainer;
