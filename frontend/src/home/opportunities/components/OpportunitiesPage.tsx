import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from 'common/components/material/Button';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import DesktopApplicationBar from 'home/components/headers/DesktopApplicationBar';
import ManageOpportunityModal from './ManageOpportunityModal';
import { useState } from 'react';
import { ManageOpportunity, Opportunity } from '../types/Opportunity.type';
import useGetOpportunitiesApi from '../hooks/useGetOpportunitiesApi';
import { CircularProgress } from '@mui/material';
import ColorPalette from 'common/theme/colorPalette';
import OpportunityCard from './OpportunityCard';

const OpportunitiesPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [opportunity, setOpportunity] = useState<ManageOpportunity | undefined>();

  const { data: opportunities, isLoading } = useGetOpportunitiesApi();

  const closeOpportunitiesModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (opportunity: Opportunity) => {
    const opportunityToEdit: ManageOpportunity = {
      title: opportunity.title,
      description: opportunity.description,
      jobTitle: opportunity.jobTitle,
      skills: opportunity.skills,
      creatorId: opportunity?.creator?.externalId,
      entityId: opportunity?.entityId,
    };
    setOpportunity(opportunityToEdit);
    setModalOpen(true);
  };

  return (
    <>
      <DesktopApplicationBar />
      <Stack m={4} spacing={3}>
        <Stack alignItems="flex-end">
          <Button
            sx={{ borderRadius: '0.75rem', width: '10rem' }}
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AddCircleRoundedIcon fontSize="medium" />
              <Typography variant="body1">Create</Typography>
            </Stack>
          </Button>
        </Stack>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          {isLoading && <CircularProgress size={45} />}
          {!isLoading && !opportunities?.length && (
            <Typography
              variant="h2"
              color={ColorPalette.PRIMARY800}
              fontWeight={300}
              sx={{ pt: 20 }}
            >
              NO OPPORTUNITIES FOUND
            </Typography>
          )}
          {!isLoading &&
            opportunities?.map((opportunity) => (
              <OpportunityCard
                opportunity={opportunity}
                key={opportunity?.entityId}
                handleEdit={handleEdit}
              />
            ))}
        </Stack>
      </Stack>
      <ManageOpportunityModal
        showModal={isModalOpen}
        closeModal={closeOpportunitiesModal}
        opportunity={opportunity}
      />
    </>
  );
};

export default OpportunitiesPage;
