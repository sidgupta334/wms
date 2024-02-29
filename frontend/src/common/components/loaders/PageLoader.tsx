import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader: React.FC = () => {
  return (
    <Stack width="100%" height="100%">
      <CircularProgress
        sx={{ alignSelf: 'center', justifySelf: 'center', marginTop: 20 }}
        size={100}
      />
    </Stack>
  );
};

export default PageLoader;
