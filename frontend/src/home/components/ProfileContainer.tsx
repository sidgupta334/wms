import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CardContent } from '@mui/material';
import Card, { CardBoxShadow } from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import UserAvatar from './UserAvatar';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';
import UserInfo from './UserInfo';
import IconButton from 'common/components/material/input/IconButton';
import EditProfileModal from './EditProfileModal';
import { useState } from 'react';
import useUpdateProfileApi from 'home/hooks/useUpdateProfileApi';
import { ProfileType } from 'home/types/profile.type';

type ProfileContainerProps = {
  profile: ProfileType;
};

const ProfileContainer: React.FC<ProfileContainerProps> = ({ profile }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate: updateProfile, isLoading } = useUpdateProfileApi();

  const closeProfileModal = () => {
    setModalOpen(false);
  };

  const handleProfileUpdate = (data: Object) => {
    closeProfileModal();
    updateProfile({ ...data, externalId: profile?.externalId });
    return {};
  };

  return (
    <>
      <Card boxShadow={CardBoxShadow.SHADOW3} sx={{ maxHeight: '85vh', overflow: 'auto' }}>
        <CardContent>
          <Stack alignItems="flex-end">
            <IconButton
              color="primary"
              aria-label="delete"
              size="large"
              onClick={() => setModalOpen(true)}
            >
              <EditRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={3} m={2} alignItems="center">
            <UserAvatar name={profile?.name} />
            <Typography variant="h1" color={ColorPalette.PRIMARY700}>
              {profile?.name}
            </Typography>
            <UserInfo profile={profile} />
          </Stack>
        </CardContent>
      </Card>
      <EditProfileModal
        isLoading={isLoading}
        showModal={isModalOpen}
        jobTitle={profile?.jobTitle}
        skills={profile?.skills}
        closeModal={closeProfileModal}
        handleProfileEdit={handleProfileUpdate}
      />
    </>
  );
};

export default ProfileContainer;
