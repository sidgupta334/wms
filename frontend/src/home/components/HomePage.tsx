import Stack from 'common/components/material/Stack';
import DesktopApplicationBar from './headers/DesktopApplicationBar';
import ProfileContainer from './ProfileContainer';
import Grid from 'common/components/material/Grid';
import useSession from 'common/hooks/useSession';

const HomePage: React.FC = () => {
  const { profile } = useSession();
  return (
    <>
      <DesktopApplicationBar />
      <Grid container my={4} mx={2}>
        <Grid item md={5}>
          <ProfileContainer profile={profile} />
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;
