import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import HeaderLink from 'admin/components/HeaderLink';
import ElevationScroll from 'common/components/containers/ElevationScroll';
import ApplicationBar from 'common/components/headers/ApplicationBar';
import Grid from 'common/components/material/Grid';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import useLogoutApi from 'common/hooks/useLogoutApi';
import useRouter from 'common/hooks/useRouter';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import SearchBar from './SearchBar';
import useSession from 'common/hooks/useSession';
import ColorPalette from 'common/theme/colorPalette';

const DesktopApplicationBar: React.FC = () => {
  const { redirectToRoute } = useRouter();
  const { logoutUser } = useLogoutApi();
  const { isAdmin } = useSession();

  const handleLogoClick = () => {
    redirectToRoute(AppRoutesEnum.HOME);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const goToOpportunities = () => {
    redirectToRoute(AppRoutesEnum.OPPORTUNITIES);
  };

  const goToAdmin = () => {
    redirectToRoute(AppRoutesEnum.ADMIN_HOME);
  };

  return (
    <ElevationScroll>
      <ApplicationBar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item md={1}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
              onClick={handleLogoClick}
            >
              <img src="/images/logo.png" width={45} height={45} />
              <Typography variant="h3" sx={{ color: ColorPalette.BLACK }} fontWeight={700}>
                WMS
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={3}>
            <SearchBar />
          </Grid>
          <Grid item>
            <HeaderLink
              Icon={WorkHistoryRoundedIcon}
              label="Opportunities"
              onClick={goToOpportunities}
            />
            {isAdmin && (
              <HeaderLink
                Icon={AdminPanelSettingsIcon}
                label="Manage Settings"
                onClick={goToAdmin}
              />
            )}
          </Grid>
          <Grid item>
            <HeaderLink Icon={ExitToAppRoundedIcon} label="Logout" onClick={handleLogout} />
          </Grid>
        </Grid>
      </ApplicationBar>
    </ElevationScroll>
  );
};

export default DesktopApplicationBar;
