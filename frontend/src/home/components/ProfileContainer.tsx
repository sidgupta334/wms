import { CardContent } from '@mui/material';
import Card, { CardBoxShadow } from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import UserAvatar from './UserAvatar';
import Typography from 'common/components/material/Typography';
import useSession from 'common/hooks/useSession';
import ColorPalette from 'common/theme/colorPalette';
import UserInfo from './UserInfo';

const ProfileContainer: React.FC = () => {
  const { profile } = useSession();

  return (
    <Card boxShadow={CardBoxShadow.SHADOW3}>
      <CardContent>
        <Stack spacing={3} m={2} alignItems="center">
          <UserAvatar name={profile?.name} />
          <Typography variant="h1" color={ColorPalette.PRIMARY700}>
            {profile?.name}
          </Typography>
          <UserInfo profile={profile} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileContainer;
