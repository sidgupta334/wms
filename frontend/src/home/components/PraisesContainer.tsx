import Card, { CardBoxShadow, CardContent } from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ButtonTabs from 'common/components/navigation/ButtonTabs';
import ColorPalette from 'common/theme/colorPalette';
import { PraiseContentTab } from 'home/types/praise.type';
import { ProfileType } from 'home/types/profile.type';
import { useState } from 'react';
import SkillsContent from './SkillsContent';
import PraisesContent from './PraisesContent';
import TextField from 'common/components/material/TextField';
import useDebounce from 'common/hooks/useDebounce';
import useSearchSkillsApi from 'common/hooks/useSearchSkillsApi';

type PraisesContainerProps = {
  profile: ProfileType;
};

const TABS = [
  { value: PraiseContentTab.SKILLS, label: PraiseContentTab.SKILLS, fontSize: 18 },
  { value: PraiseContentTab.PRAISES, label: PraiseContentTab.PRAISES, fontSize: 18 },
];

const PraisesContainer: React.FC<PraisesContainerProps> = ({ profile }) => {
  const [inputValue, setInputValue] = useState('');

  const { data: searchedSkills } = useSearchSkillsApi(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchedSkills(e.target.value);
  };

  return (
    <>
      <Card boxShadow={CardBoxShadow.SHADOW3} sx={{ maxHeight: '85vh', overflow: 'auto' }}>
        <CardContent>
          <Stack spacing={2} sx={{ p: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="h4"
                color={ColorPalette.PRIMARY700}
                sx={{ fontWeight: 'bolder' }}
              >
                Skill Endorsements
              </Typography>
              <TextField
                variant="outlined"
                onChange={handleInputChange}
                label="Search skills"
              />
            </Stack>
          </Stack>
          <SkillsContent profile={profile} />
        </CardContent>
      </Card>
    </>
  );
};

export default PraisesContainer;
