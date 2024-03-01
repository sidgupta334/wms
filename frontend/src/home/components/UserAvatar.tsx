import { Avatar } from '@mui/material';
import useSession from 'common/hooks/useSession';
import useGetAvatarTextAndColor from 'home/hooks/useGetAvatarTextAndColor';

const UserAvatar: React.FC<{ name: string }> = ({ name }) => {
  const { initials, color } = useGetAvatarTextAndColor(name);
  return (
    <Avatar sx={{ bgcolor: color, width: 136, height: 136, fontSize: 54 }}>
      {' '}
      {initials}{' '}
    </Avatar>
  );
};

export default UserAvatar;
