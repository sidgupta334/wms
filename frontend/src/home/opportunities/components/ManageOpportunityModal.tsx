import { ManageOpportunity } from '../types/Opportunity.type';

type ManageOpportunityModalProps = {
  showModal?: boolean;
  isLoading?: boolean;
  closeModal: Function;
  opportunity?: ManageOpportunity;
};

const ManageOpportunityModal: React.FC<ManageOpportunityModalProps> = ({
  showModal,
  closeModal,
  isLoading,
  opportunity,
}) => {
  return <></>;
};

export default ManageOpportunityModal;
