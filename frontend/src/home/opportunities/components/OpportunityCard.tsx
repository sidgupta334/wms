import Stack from 'common/components/material/Stack';
import { Opportunity } from '../types/Opportunity.type';
import Typography from 'common/components/material/Typography';
import ColorPalette from 'common/theme/colorPalette';
import Card, { CardBoxShadow, CardContent } from 'common/components/material/Card';
import Button from 'common/components/material/Button';
import OpportunityOptions from './OpportunityOptions';
import MailLinkWrapper from 'common/components/navigation/MailLinkWrapper';
import { StyledSkillChip } from 'home/components/SkillChip';
import Box from 'common/components/material/Box';
import HorizontalScrollableContainer from 'common/components/containers/HorizontalScrollableContainer';
import useSession from 'common/hooks/useSession';

const OpportunityCard: React.FC<{ opportunity: Opportunity; handleEdit: Function }> = ({
  opportunity,
  handleEdit,
}) => {
  const { profile, isAdmin } = useSession();

  const scrolledSkillsElement = (
    <Stack
      py={0.5}
      direction="row"
      spacing={1}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {opportunity.skills?.map((skill) => (
        <StyledSkillChip label={skill.name} key={skill.id} />
      ))}
    </Stack>
  );

  return (
    <Card
      boxShadow={CardBoxShadow.SHADOW3}
      hoverShadow={CardBoxShadow.SHADOW5}
      sx={{ width: '80%' }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Stack direction="row" spacing={1}>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ color: ColorPalette.BLUEGRAY800 }}
                >
                  {opportunity?.creator?.name}
                </Typography>
                <Typography variant="body1" sx={{ color: ColorPalette.BLUEGRAY700 }}>
                  created an opportunity
                </Typography>
              </Stack>
              {opportunity.timestamp && (
                <Typography variant="body3" sx={{ color: ColorPalette.GRAY900 }}>
                  {new Date(opportunity.timestamp).toDateString()}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={2}>
              {(isAdmin || profile?.externalId === opportunity?.creator?.externalId) && (
                <Button
                  btntype="primary"
                  sx={{
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    height: '40px',
                    padding: '0 10px',
                    minWidth: 0,
                    lineHeight: 1,
                  }}
                >
                  Find Resources
                </Button>
              )}
              <MailLinkWrapper address={opportunity?.creator?.email || ''}>
                <Button
                  btntype="secondary"
                  sx={{
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    height: '40px',
                    padding: '0 10px',
                    minWidth: 0,
                    lineHeight: 1,
                  }}
                >
                  Get in touch
                </Button>
              </MailLinkWrapper>
              <OpportunityOptions
                opportunity={opportunity}
                key={opportunity?.entityId}
                handleEdit={handleEdit}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{ border: `1px solid ${ColorPalette.GRAY400}`, borderRadius: '12px' }}
            p={2}
          >
            <Typography variant="h4" fontWeight={600} sx={{ color: ColorPalette.BLACK }}>
              {opportunity.title}
            </Typography>
            <Typography
              mt={2}
              variant="body3"
              fontWeight={500}
              sx={{ color: ColorPalette.BLUEGRAY900 }}
            >
              {opportunity.description}
            </Typography>
            <Box width="98%" pt={2}>
              <HorizontalScrollableContainer scrolledListElement={scrolledSkillsElement} />
            </Box>
            <Stack
              mt={1.75}
              direction="row"
              spacing={0.5}
              sx={{ color: ColorPalette.BLUEGRAY700 }}
            >
              <Typography variant="body3">Job Title:</Typography>
              <Typography
                variant="body3"
                fontWeight={600}
                sx={{ color: ColorPalette.BLUEGRAY900 }}
              >
                {opportunity.jobTitle?.name}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
