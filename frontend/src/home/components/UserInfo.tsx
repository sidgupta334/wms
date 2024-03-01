import Stack from 'common/components/material/Stack';
import UserEmailLabel from './UserEmailLabel';
import UserJobTitle from './UserJobTitle';
import SkillList from './SkillList';

const UserInfo: React.FC<{ profile: any }> = ({ profile }) => {
  return (
    <Stack spacing={1}>
      <UserEmailLabel email={profile?.email} />
      {!!profile?.jobTitle && <UserJobTitle jobTitle={profile?.jobTitle?.name} />}
      {!!profile?.skills && profile?.skills.length && <SkillList skills={profile.skills} />}
    </Stack>
  );
};

export default UserInfo;
