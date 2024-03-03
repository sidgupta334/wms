import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';
import { Skill } from 'home/types/skill.type';
import { StyledSkillChip } from './SkillChip';

const SkillList: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <AcUnitRoundedIcon color="primary" />
        <Typography color={ColorPalette.PRIMARY500} variant="body1">
          Skills:
        </Typography>
      </Stack>
      <Stack flexWrap="wrap" gap={0.5} direction="row">
        {skills.map((skill) => (
          <StyledSkillChip label={skill.name} key={skill.id} />
        ))}
      </Stack>
    </Stack>
  );
};

export default SkillList;
