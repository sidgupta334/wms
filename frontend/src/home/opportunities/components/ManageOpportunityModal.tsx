import { useEffect, useState } from 'react';
import { ManageOpportunity } from '../types/Opportunity.type';
import { JobSkillType } from 'common/types/JobSkillType';
import TransitionModal from 'common/components/material/modals/TransitionModal';
import Container from 'common/components/material/Container';
import RootContainer from 'common/components/containers/RootContainer';
import ColorPalette from 'common/theme/colorPalette';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import CloseButton from 'common/components/navigation/CloseButton';
import BackButton from 'common/components/navigation/BackButton';
import JobTitleSelector from 'common/components/autocomplete/JobTitleSelector';
import SkillsSelector from 'common/components/autocomplete/SkillsSelector';
import Button from 'common/components/material/Button';
import { isEmpty, isNil } from 'lodash';
import TextField from 'common/components/material/TextField';
import useCreateOpportunityApi from '../hooks/useCreateOpportunityApi';
import useManageOpportunityApi from '../hooks/useManageOpportunityApi';
import useSession from 'common/hooks/useSession';
import { CircularProgress } from '@mui/material';

type ManageOpportunityModalProps = {
  showModal?: boolean;
  closeModal: Function;
  opportunity?: ManageOpportunity;
};

const ManageOpportunityModal: React.FC<ManageOpportunityModalProps> = ({
  showModal = false,
  closeModal,
  opportunity,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(showModal);
  const [getTitle, setTitle] = useState<string>(opportunity?.title || '');
  const [getDescription, setDescription] = useState<string>(opportunity?.description || '');
  const [getJobTitle, setJobTitle] = useState<JobSkillType | undefined>(
    opportunity?.jobTitle,
  );
  const [getSkills, setSkills] = useState<JobSkillType[]>(opportunity?.skills || []);
  const { profile } = useSession();

  const isUpdate = !isEmpty(opportunity);

  const title = isUpdate ? 'Manage Opportunity' : 'Create Opportunity';

  const { mutateAsync: createOpportunity, isLoading: creatingOpportunity } =
    useCreateOpportunityApi();
  const { mutateAsync: updateOpportunity, isLoading: managingOpportunity } =
    useManageOpportunityApi();

  const isButtonDisabled =
    isEmpty(getJobTitle) ||
    getSkills.length === 0 ||
    isNil(getTitle) ||
    creatingOpportunity ||
    managingOpportunity;

  useEffect(() => {
    setModalOpen(showModal);
    setTitle(opportunity?.title || '');
    setDescription(opportunity?.description || '');
    setJobTitle(opportunity?.jobTitle);
    setSkills(opportunity?.skills || []);
  }, [showModal, opportunity?.jobTitle?.id, opportunity?.skills?.length]);

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setJobTitle(undefined);
    setSkills([]);
  };

  const handleConfirmClick = async () => {
    const payloadData = {
      title: getTitle,
      description: getDescription,
      creatorId: profile?.externalId,
      jobTitleId: getJobTitle?.id,
      skills: getSkills.map((skill) => skill.id),
    };
    if (isUpdate) {
      await updateOpportunity({ ...payloadData, entityId: opportunity?.entityId });
    } else {
      await createOpportunity(payloadData);
    }
    resetForm();
    closeModal();
  };

  return (
    <TransitionModal open={isModalOpen} onClosed={() => closeModal()}>
      <div>
        <Container disableGutters>
          <RootContainer
            backgroundColor={ColorPalette.WHITE}
            header={
              <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography
                  variant="h2"
                  fontWeight={700}
                  color={ColorPalette.BLUEGRAY900}
                  ml={1}
                >
                  {title}
                </Typography>
                <CloseButton clickHandler={() => closeModal()} />
              </Stack>
            }
            maxWidth="lg"
            headerNavButton={<BackButton />}
          >
            <Stack pt={5} spacing={4} alignItems="center" justifyContent="center">
              <Stack width="100%" spacing={2}>
                <TextField value={getTitle} label="Title" onChange={handleSetTitle} />
                <TextField
                  multiline
                  rows={4}
                  value={getDescription}
                  label="Description"
                  onChange={handleSetDescription}
                />
                <JobTitleSelector
                  value={opportunity?.jobTitle ? [opportunity?.jobTitle] : []}
                  onChange={(jobTitle) => {
                    setJobTitle(jobTitle.length ? jobTitle[0] : undefined);
                  }}
                />
                <SkillsSelector
                  value={opportunity?.skills || []}
                  onChange={(skills) => {
                    setSkills(skills);
                  }}
                />
              </Stack>
            </Stack>
            <Button
              disabled={isButtonDisabled}
              fullWidth
              variant="contained"
              sx={{ borderRadius: '0.75rem' }}
              onClick={handleConfirmClick}
            >
              {!creatingOpportunity &&
                !managingOpportunity &&
                !isUpdate &&
                'Create Opportunity'}
              {!creatingOpportunity &&
                !managingOpportunity &&
                isUpdate &&
                'Manage Opportunity'}
              {(creatingOpportunity || managingOpportunity) && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1" color={ColorPalette.GRAY800}>
                    Managing Opportunity...
                  </Typography>
                  <CircularProgress size={25} sx={{ color: ColorPalette.GRAY800 }} />
                </Stack>
              )}
            </Button>
          </RootContainer>
        </Container>
      </div>
    </TransitionModal>
  );
};

export default ManageOpportunityModal;
