import Card, { CardBoxShadow, CardContent } from 'common/components/material/Card';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';
import { PraiseContentTab } from 'home/types/praise.type';
import { ProfileType } from 'home/types/profile.type';
import { useState } from 'react';
import SkillsContent from './SkillsContent';
import TextField from 'common/components/material/TextField';
import useSearchSkillsApi from 'common/hooks/useSearchSkillsApi';
import useDebounce from 'common/hooks/useDebounce';
import { validateMinLength } from 'common/utils/app.utils';
import { CircularProgress } from '@mui/material';

type PraisesContainerProps = {
  profile: ProfileType;
};

const PraisesContainer: React.FC<PraisesContainerProps> = ({ profile }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);

  const { data: searchedSkills, isLoading } = useSearchSkillsApi(debouncedInputValue, {
    enabled: validateMinLength(debouncedInputValue, 1),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
          {isLoading && <CircularProgress sx={{ mx: 40 }} />}
          {!isLoading && <SkillsContent profile={profile} searchedSkills={searchedSkills} />}
        </CardContent>
      </Card>
    </>
  );
};

export default PraisesContainer;
