import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from 'common/components/material/Button';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import DesktopApplicationBar from 'home/components/headers/DesktopApplicationBar';

const OpportunitiesPage: React.FC = () => {
  return (
    <>
      <DesktopApplicationBar />
      <Stack m={4}>
        <Stack alignItems="flex-end">
          <Button
            sx={{ borderRadius: '0.75rem', width: '10rem' }}
            size="medium"
            variant="contained"
            color="primary"
            // onClick={openHoardingDrawer}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AddCircleRoundedIcon fontSize="medium" />
              <Typography variant="body1">Create</Typography>
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default OpportunitiesPage;
