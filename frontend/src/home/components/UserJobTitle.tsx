import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';

const UserJobTitle: React.FC<{ jobTitle: string }> = ({ jobTitle }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack direction="row" spacing={0.75} alignItems="center">
        <WorkRoundedIcon color="primary" />
        <Typography color={ColorPalette.PRIMARY500} variant="body1">
          Job Title:
        </Typography>
      </Stack>
      <Typography variant="body1" fontWeight={600} color={ColorPalette.PRIMARY600}>
        {jobTitle}
      </Typography>
    </Stack>
  );
};

export default UserJobTitle;
