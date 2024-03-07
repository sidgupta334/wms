import { CardContent } from '@mui/material';
import Card from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import { JobSkillType } from 'common/types/JobSkillType';

type SkillDetailsProps = {
  skill: JobSkillType;
  isEndorsed: boolean;
};

const SkillDetails: React.FC<SkillDetailsProps> = ({ isEndorsed, skill }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="center"></Stack>
      </CardContent>
    </Card>
  );
};
