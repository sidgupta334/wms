import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ApplicationBar from '../../common/components/headers/ApplicationBar';
import Grid from '../../common/components/material/Grid';
import Stack from '../../common/components/material/Stack';
import Typography from '../../common/components/material/Typography';
import ElevationScroll from '../../common/components/containers/ElevationScroll';
import AdminLinks from './AdminLinks';
import useRouter from 'common/hooks/useRouter';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import HeaderLink from './HeaderLink';
import useLogoutApi from 'common/hooks/useLogoutApi';

const DesktopAdminApplicationBar: React.FC = () => {
  const { redirectToRoute } = useRouter();
  const { logoutUser } = useLogoutApi();

  const handleLogoClick = () => {
    redirectToRoute(AppRoutesEnum.HOME);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <ElevationScroll>
      <ApplicationBar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
            >
              <img src="/images/logo.png" width={45} height={45} />
              <Typography variant="h3" fontWeight={700}>
                WMS
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <AdminLinks />
          </Grid>
          <Grid item>
            <HeaderLink Icon={ExitToAppRoundedIcon} label="Logout" onClick={handleLogout} />
          </Grid>
        </Grid>
      </ApplicationBar>
    </ElevationScroll>
  );
};

export default DesktopAdminApplicationBar;
