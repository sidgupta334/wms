import { FloatingMenuItem } from 'common/components/material/FloatingMenu';
import ThreeDotMenu from 'common/components/material/ThreeDotsMenu';
import ColorPalette from 'common/theme/colorPalette';
import { Opportunity } from '../types/Opportunity.type';
import useDeleteOpportunityApi from '../hooks/useDeleteOpportunityApi';
import useSession from 'common/hooks/useSession';

const DEFAULT_FEED_CARD_OPTIONS: FloatingMenuItem[] = [
  {
    value: 'edit',
    label: 'Edit',
  },
  {
    value: 'delete',
    label: 'Delete',
    color: ColorPalette.RED400,
  },
];

type OpportunityOptionsProps = {
  handleEdit: Function;
  opportunity: Opportunity;
};

const OpportunityOptions: React.FC<OpportunityOptionsProps> = ({
  handleEdit,
  opportunity,
}) => {
  const { profile, isAdmin } = useSession();

  const { mutateAsync: deleteOpportunity } = useDeleteOpportunityApi();

  if (!isAdmin && profile?.externalId !== opportunity?.creator?.externalId) {
    return <></>;
  }

  const handleDeleteOpportunity = async (opportunityId?: string) => {
    if (!opportunityId) return;
    await deleteOpportunity(opportunityId);
  };

  const handleSelect = (item: FloatingMenuItem) => {
    switch (item.value) {
      case 'edit':
        handleEdit(opportunity);
        break;
      case 'delete':
        handleDeleteOpportunity(opportunity.entityId);
    }
  };

  return <ThreeDotMenu items={DEFAULT_FEED_CARD_OPTIONS} onSelect={handleSelect} />;
};

export default OpportunityOptions;
