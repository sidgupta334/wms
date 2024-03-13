import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import useGetSearchProfileById from 'home/hooks/useGetSearchProfileById';
import { EndorsedSkillType, ProfileType } from 'home/types/profile.type';
import { isEmpty } from 'lodash';
import SkillDetails from './SkillDetails';
import { CircularProgress } from '@mui/material';
import Box from 'common/components/material/Box';
import { JobSkillType } from 'common/types/JobSkillType';
import { useMemo } from 'react';
import { filterEndorsedAndSearchedSkills } from 'common/utils/app.utils';
import ColorPalette from 'common/theme/colorPalette';

const SkillsContent: React.FC<{ profile: ProfileType; searchedSkills?: JobSkillType[] }> = ({
  profile,
  searchedSkills = [],
}) => {
  const { data: employee, isLoading } = useGetSearchProfileById(profile.externalId);

  const allSkills = useMemo(
    () => filterEndorsedAndSearchedSkills(employee?.endorsedSkills || [], searchedSkills),
    [employee?.endorsedSkills?.length, searchedSkills.length],
  );

  if (isLoading) return <CircularProgress sx={{ mx: 40 }} />;
  if (!isLoading && isEmpty(allSkills)) {
    return (
      <Box mx={24} my={10}>
        <Typography variant="h2">NO SKILLS ENDORSED</Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack py={2} direction="row" justifyContent="space-between" alignItems="center" px={6}>
        <Typography variant="body1" sx={{ color: ColorPalette.BLUEGRAY700 }}>
          SKILLS
        </Typography>
        <Typography variant="body1" sx={{ color: ColorPalette.BLUEGRAY700, pl: 6 }}>
          ENDORSEMENTS
        </Typography>
        <Typography variant="body1" sx={{ color: ColorPalette.BLUEGRAY700 }}>
          ACTIONS
        </Typography>
      </Stack>
      <Stack spacing={1.5}>
        {allSkills.map((skill: EndorsedSkillType) => (
          <SkillDetails
            skill={skill}
            key={skill.externalCode}
            profileId={profile.externalId}
          />
        ))}
      </Stack>
    </>
  );
};

export default SkillsContent;
