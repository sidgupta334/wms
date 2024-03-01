import Stack from 'common/components/material/Stack';
import DesktopApplicationBar from './headers/DesktopApplicationBar';
import ProfileContainer from './ProfileContainer';
import Grid from 'common/components/material/Grid';

const HomePage: React.FC = () => {
  return (
    <>
      <DesktopApplicationBar />
      <Grid container my={4} mx={2}>
        <Grid item md={5}>
          <ProfileContainer />
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;
