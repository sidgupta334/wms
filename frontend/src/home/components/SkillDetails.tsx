import { CardContent } from '@mui/material';
import Box from 'common/components/material/Box';
import Button from 'common/components/material/Button';
import Card from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import useSession from 'common/hooks/useSession';
import ColorPalette from 'common/theme/colorPalette';
import { useEndorseSkill } from 'home/hooks/useEndorseSkill';
import { useUnendorseSkill } from 'home/hooks/useUnendorseSkill';
import { EndorsedSkillType } from 'home/types/profile.type';
import { useEffect, useState } from 'react';

type SkillDetailsProps = {
  skill: EndorsedSkillType;
  count: number;
  profileId: string;
};

const SkillDetails: React.FC<SkillDetailsProps> = ({ count, skill, profileId }) => {
  const [skillCount, setSkillCount] = useState<number>(count);
  const { mutateAsync: endorseSkill, isLoading: isEndorsing } = useEndorseSkill(profileId);
  const { mutateAsync: unEndorseSkill, isLoading: isUnendorsing } =
    useUnendorseSkill(profileId);
  const { profile } = useSession();

  useEffect(() => {
    setSkillCount(skillCount || count);
  }, [count]);

  const handleEndorseSkill = async () => {
    await endorseSkill({
      giverId: profile?.eexternalId,
      receiverId: profileId,
      skills: skill.externalCode,
    });
    setSkillCount((prev) => prev + 1);
  };

  const handleUnendorseSkill = async () => {
    await unEndorseSkill({
      giverId: profile?.eexternalId,
      skillId: skill.externalCode,
    });
    setSkillCount((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <Card sx={{ border: `2px solid ${ColorPalette.GRAY400}` }}>
      <Box sx={{ px: 0.5, py: 1.25 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2}>
          <Stack direction="row" spacing={3}>
            <div
              style={{
                backgroundColor: ColorPalette.PRIMARY400,
                width: '0.215rem',
                borderRadius: '0.75rem',
              }}
            ></div>
            <Typography variant="body2">{skill.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              sx={{ color: ColorPalette.PRIMARY300, pr: 12 }}
              variant="h3"
              fontWeight={700}
            >
              {skillCount}
            </Typography>
            <Button
              disabled={isEndorsing}
              variant="contained"
              size="small"
              onClick={handleEndorseSkill}
            >
              {isEndorsing && 'Endorsing...'}
              {!isEndorsing && 'Endorse'}
            </Button>
            <Button
              disabled={isUnendorsing}
              variant="outlined"
              size="small"
              onClick={handleUnendorseSkill}
            >
              {isUnendorsing && 'Unendorsing...'}
              {!isUnendorsing && 'Unendorse'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default SkillDetails;
