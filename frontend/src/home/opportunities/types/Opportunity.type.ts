import { JobSkillType } from 'common/types/JobSkillType';
import { ProfileType } from 'home/types/profile.type';

export type Opportunity = {
  entityId?: string;
  title: string;
  description: string;
  jobTitle?: JobSkillType;
  skills?: JobSkillType[];
  creator?: ProfileType;
};

export type ManageOpportunity = Opportunity & {
  jobTitleId: string;
  creatorId: string;
  description: string;
  skills: string[];
};
