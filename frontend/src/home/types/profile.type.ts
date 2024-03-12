import { JobSkillType } from 'common/types/JobSkillType';

export type ProfileType = {
  email: string;
  name: string;
  externalId: string;
  jobTitle?: JobSkillType;
  skills: JobSkillType[];
  admin?: boolean;
};

export type JobSkillSearchType = {
  externalCode: string;
  name: string;
};

export type EndorsedSkillType = JobSkillSearchType & {
  count: number;
};

export type ProfileSearchType = ProfileType & {
  jobTitle?: JobSkillSearchType;
  skills: JobSkillSearchType[];
  endorsedSkills: EndorsedSkillType[];
};
