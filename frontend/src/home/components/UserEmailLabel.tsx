import MailRoundedIcon from '@mui/icons-material/MailRounded';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';

const UserEmailLabel: React.FC<{ email: string }> = ({ email }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack direction="row" spacing={0.75} alignItems="center">
        <MailRoundedIcon color="primary" />
        <Typography color={ColorPalette.PRIMARY500} variant="body1">
          Email:
        </Typography>
      </Stack>
      <Typography variant="body1" fontWeight={600} color={ColorPalette.PRIMARY600}>
        {email}
      </Typography>
    </Stack>
  );
};

export default UserEmailLabel;
