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

type PraisesContainerProps = {
  profile: ProfileType;
};

const TABS = [
  { value: PraiseContentTab.SKILLS, label: PraiseContentTab.SKILLS, fontSize: 18 },
  { value: PraiseContentTab.PRAISES, label: PraiseContentTab.PRAISES, fontSize: 18 },
];

const PraisesContainer: React.FC<PraisesContainerProps> = ({ profile }) => {
  const [selectedTab, setSelectedTab] = useState(PraiseContentTab.SKILLS);

  const handleChange = (newValue: PraiseContentTab) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Card boxShadow={CardBoxShadow.SHADOW3} sx={{ maxHeight: '85vh', overflow: 'auto' }}>
        <CardContent>
          <Stack spacing={2} sx={{ p: 1 }}>
            <Typography
              variant="h3"
              color={ColorPalette.PRIMARY700}
              sx={{ fontWeight: 'bolder' }}
            >
              Praises and Endorsements
            </Typography>
            <ButtonTabs
              value={selectedTab}
              tabs={TABS}
              onChange={handleChange}
              btnGap={1.75}
            />
          </Stack>
          {(() => {
            switch (selectedTab) {
              case PraiseContentTab.SKILLS:
                return <SkillsContent profile={profile} />;
              default:
                return <PraisesContent profile={profile} />;
            }
          })()}
        </CardContent>
      </Card>
    </>
  );
};

export default PraisesContainer;
