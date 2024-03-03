import JobTitleSelector from 'common/components/autocomplete/JobTitleSelector';
import SkillsSelector from 'common/components/autocomplete/SkillsSelector';
import RootContainer from 'common/components/containers/RootContainer';
import Button from 'common/components/material/Button';
import Container from 'common/components/material/Container';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import TransitionModal from 'common/components/material/modals/TransitionModal';
import BackButton from 'common/components/navigation/BackButton';
import CloseButton from 'common/components/navigation/CloseButton';
import ColorPalette from 'common/theme/colorPalette';
import { JobSkillType } from 'common/types/JobSkillType';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

type EditProfileModalType = {
  showModal?: boolean;
  jobTitle?: JobSkillType;
  skills?: JobSkillType[];
  isLoading?: boolean;
  handleProfileEdit: (data: Object) => {};
  closeModal: Function;
};

const EditProfileModal: React.FC<EditProfileModalType> = ({
  closeModal,
  skills = [],
  jobTitle,
  handleProfileEdit,
  showModal = false,
  isLoading = false,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(showModal);
  const [getJobTitle, setJobTitle] = useState<JobSkillType | undefined>(jobTitle);
  const [getSkills, setSkills] = useState<JobSkillType[]>(skills);

  useEffect(() => {
    setModalOpen(showModal);
    setJobTitle(jobTitle);
    setSkills(skills || []);
  }, [showModal, jobTitle?.id, skills.length]);

  const handleConfirmClick = () => {
    handleProfileEdit({
      jobTitleId: getJobTitle?.id,
      skillIds: getSkills.map((skill) => skill.id),
    });
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
                  Update User Profile
                </Typography>
                <CloseButton clickHandler={() => closeModal()} />
              </Stack>
            }
            maxWidth="lg"
            headerNavButton={<BackButton />}
          >
            <Stack pt={5} spacing={4} alignItems="center" justifyContent="center">
              <Stack width="100%" spacing={2}>
                <JobTitleSelector
                  value={[jobTitle]}
                  onChange={(jobTitle) => {
                    setJobTitle(jobTitle.length ? jobTitle[0] : undefined);
                  }}
                />
                <SkillsSelector
                  value={skills}
                  onChange={(skills) => {
                    setSkills(skills);
                  }}
                />
              </Stack>
            </Stack>
            <Button
              disabled={isLoading || isEmpty(getJobTitle) || getSkills.length === 0}
              fullWidth
              variant="contained"
              sx={{ borderRadius: '0.75rem' }}
              onClick={handleConfirmClick}
            >
              Update Profile
            </Button>
          </RootContainer>
        </Container>
      </div>
    </TransitionModal>
  );
};

export default EditProfileModal;
