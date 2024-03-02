import { JobSkillType } from 'common/types/JobSkillType';

export type ProfileType = {
  email: string;
  name: string;
  externalId: string;
  jobTitle?: JobSkillType;
  skills: JobSkillType[];
  admin?: boolean;
};
