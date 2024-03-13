import { CircularProgress } from '@mui/material';
import Grid from 'common/components/material/Grid';
import Stack from 'common/components/material/Stack';
import PraisesContainer from 'home/components/PraisesContainer';
import ProfileContainer from 'home/components/ProfileContainer';
import DesktopApplicationBar from 'home/components/headers/DesktopApplicationBar';
import { useParams } from 'react-router-dom';
import useGetProfile from 'search/hooks/useGetProfile';

const ProfilePage: React.FC = () => {
  const { externalId } = useParams();
  console.log('externalId: ....', externalId);
  const { data: profile, isLoading } = useGetProfile(externalId || '');

  if (isLoading) {
    return (
      <Stack mt={20} width="100%" alignItems="center" justifyContent="center">
        <CircularProgress sx={{ width: 100 }} />
      </Stack>
    );
  }

  return (
    <>
      <DesktopApplicationBar />
      <Grid container my={4} mx={2}>
        <Grid item md={5}>
          <ProfileContainer profile={profile} />
        </Grid>
        <Grid item md={6} ml={3}>
          <PraisesContainer profile={profile} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
