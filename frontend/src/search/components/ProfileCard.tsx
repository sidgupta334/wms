import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import HorizontalScrollableContainer from 'common/components/containers/HorizontalScrollableContainer';
import Box from 'common/components/material/Box';
import Button from 'common/components/material/Button';
import Card, { CardBoxShadow } from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import MailLinkWrapper from 'common/components/navigation/MailLinkWrapper';
import useRouter from 'common/hooks/useRouter';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import ColorPalette from 'common/theme/colorPalette';
import { StyledSkillWhiteChip } from 'home/components/SkillWhiteChip';
import UserAvatar from 'home/components/UserAvatar';
import UserEmailLabel from 'home/components/UserEmailLabel';
import UserJobTitle from 'home/components/UserJobTitle';
import { ProfileSearchType } from 'home/types/profile.type';

const ProfileCard: React.FC<{ profile: ProfileSearchType; showEmailButton?: boolean }> = ({
  profile,
  showEmailButton = false,
}) => {
  const { redirectToEmployee } = useRouter();
  const scrolledSkillsElement = (
    <Stack
      py={0.5}
      direction="row"
      spacing={1}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {profile.skills?.map((skill) => (
        <StyledSkillWhiteChip label={skill.name} key={skill.id} />
      ))}
    </Stack>
  );

  const handleProfileCardClick = () => {
    redirectToEmployee(AppRoutesEnum.PROFILE, profile.externalId, {
      externalId: profile.externalId,
    });
  };

  return (
    <Card
      sx={{ width: '50%', p: 4, cursor: 'pointer' }}
      boxShadow={CardBoxShadow.SHADOW3}
      hoverShadow={CardBoxShadow.SHADOW6}
      onClick={handleProfileCardClick}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <UserAvatar name={profile.name} />
        <Stack width="100%">
          <Typography variant="h2" sx={{ color: ColorPalette.BLACK, mb: 2 }}>
            {profile.name}
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <UserEmailLabel email={profile.email} />
              {!showEmailButton && (
                <MailLinkWrapper address={profile.email}>
                  <Button
                    onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
                    variant="text"
                    size="small"
                    sx={{
                      borderRadius: '0.5rem',
                      backgroundColor: ColorPalette.BLUEGRAY200,
                      border: `1px solid ${ColorPalette.PRIMARY800}`,
                    }}
                  >
                    Contact
                  </Button>
                </MailLinkWrapper>
              )}
            </Stack>
            <UserJobTitle jobTitle={profile.jobTitle?.name || ''} />
          </Stack>
          <Box width="80%" pt={2} pr={2}>
            <HorizontalScrollableContainer scrolledListElement={scrolledSkillsElement} />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileCard;
